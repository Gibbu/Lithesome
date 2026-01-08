import ts from 'typescript';

import type { ComponentAPIValue, ComponentReference } from '$site/types.js';

type ParsedTypes = Record<string, ComponentReference>;

const GLOB = import.meta.glob<string>(['/src/lib/internals/types.ts', '/src/lib/types/**/*.ts'], { query: 'raw' });
const IGNORE_PROPS = ['id', 'class', 'style'];

function getInterfaceName(type: ts.ExpressionWithTypeArguments): string | null {
	const expr = type.expression;

	if (ts.isIdentifier(expr)) {
		return expr.text;
	}

	if (ts.isPropertyAccessExpression(expr)) {
		return expr.name.text;
	}

	return null;
}

export async function parseTypesFromGlob(component: string): Promise<ParsedTypes> {
	const printer = ts.createPrinter({ removeComments: true });

	const sourceFiles: ts.SourceFile[] = [];
	const interfaceMap = new Map<string, ts.InterfaceDeclaration>();
	const result: ParsedTypes = {};

	/* ---------------- load + index ---------------- */

	for (const [path, load] of Object.entries(GLOB)) {
		if (path.includes(component) || path.includes('internal')) {
			const mod = await load();

			const sourceText =
				typeof mod === 'string'
					? mod
					: typeof (mod as { default?: unknown })?.default === 'string'
						? (mod as { default: string }).default
						: '';

			if (!sourceText) continue;

			const sourceFile = ts.createSourceFile(path, sourceText, ts.ScriptTarget.Latest, true);

			sourceFiles.push(sourceFile);

			ts.forEachChild(sourceFile, (node) => {
				if (ts.isInterfaceDeclaration(node)) {
					interfaceMap.set(node.name.text, node);
				}
			});
		}
	}

	/* ---------------- helpers ---------------- */

	function parseMembers(members: readonly ts.TypeElement[], sourceFile: ts.SourceFile): ComponentAPIValue[] {
		const parsed: ComponentAPIValue[] = [];

		for (const member of members) {
			if (!ts.isPropertySignature(member)) continue;
			if (!member.name || !member.type) continue;

			const name = member.name.getText(sourceFile);

			const type = printer.printNode(ts.EmitHint.Unspecified, member.type, sourceFile);

			const rawComment = ts
				.getJSDocCommentsAndTags(member)
				.map((doc) => doc.comment)
				.filter((c): c is string => typeof c === 'string')
				.join('\n\n');

			const bindable = rawComment.includes('### `$bindable`');
			const required = !member.questionToken;

			const comment = rawComment.replace(/###\s*`\$bindable`/g, '').trim();

			parsed.push({
				name,
				type,
				comment,
				...(bindable ? { bindable: true } : {}),
				...(required ? { required: true } : {})
			});
		}

		return parsed;
	}

	function collectInheritedProps(
		node: ts.InterfaceDeclaration,
		sourceFile: ts.SourceFile,
		seen = new Set<string>()
	): ComponentAPIValue[] {
		if (!node.heritageClauses) return [];

		const inherited: ComponentAPIValue[] = [];

		for (const clause of node.heritageClauses) {
			if (clause.token !== ts.SyntaxKind.ExtendsKeyword) continue;

			for (const heritageType of clause.types) {
				const name = getInterfaceName(heritageType);
				if (!name || seen.has(name)) continue;

				const parent = interfaceMap.get(name);
				if (!parent) continue;

				seen.add(name);

				// recurse FIRST (deep inheritance)
				inherited.push(...collectInheritedProps(parent, parent.getSourceFile(), seen));

				inherited.push(...parseMembers(parent.members, parent.getSourceFile()));
			}
		}

		return inherited;
	}

	function mergeProps(base: ComponentAPIValue[], local: ComponentAPIValue[]): ComponentAPIValue[] {
		const map = new Map<string, ComponentAPIValue>();

		for (const prop of local) {
			if (!IGNORE_PROPS.includes(prop.name)) map.set(prop.name, prop);
		}
		for (const prop of base) {
			if (!IGNORE_PROPS.includes(prop.name)) map.set(prop.name, prop);
		}

		return [...map.values()];
	}

	/* ---------------- main walk ---------------- */

	for (const sourceFile of sourceFiles) {
		ts.forEachChild(sourceFile, (node) => {
			if (ts.isInterfaceDeclaration(node) && node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) {
				const match = node.name.text.match(/^(.+?)(Props|State)$/);
				if (!match) return;

				const [, componentName, kind] = match as [string, string, 'Props' | 'State'];

				result[componentName] ??= { props: [], state: [] };

				const local = parseMembers(node.members, sourceFile);

				if (kind === 'Props') {
					const inherited = collectInheritedProps(node, sourceFile);
					result[componentName].props = mergeProps(inherited, local);
				} else {
					result[componentName].state = local;
				}
			}
		});
	}

	return result;
}
