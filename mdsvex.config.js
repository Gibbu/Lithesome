import path from 'node:path';
import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import externalLinks from 'rehype-external-links';
import slug from 'rehype-slug';
import { visit } from 'unist-util-visit';

function codeblockWrapper() {
	const component = 'CodeBlock';

	return (tree) => {
		visit(tree, 'element', (node, index, parent) => {
			if (!parent || node.tagName !== 'pre') return;

			const codeNode = node.children?.[0];
			if (!codeNode || codeNode.type !== 'element' || codeNode.tagName !== 'code') return;

			const raw = codeNode.children
				.filter((c) => c.type === 'text')
				.map((c) => c.value)
				.join('');

			const languageClass = codeNode.properties?.className?.find((cls) => cls.startsWith('language-')) || null;

			const wrapper = {
				type: 'element',
				tagName: component,
				properties: {
					code: raw.replace(/"/g, '&quot;'),
					...(languageClass && { lang: languageClass.replace('language-', '') })
				},
				children: []
			};

			parent.children.splice(index, 1, wrapper);
		});
	};
}

const config = defineConfig({
	extensions: ['.svx'],

	layout: path.join(process.cwd(), 'src', 'site', 'markdown', 'layout.svelte'),

	smartypants: {
		dashes: 'oldschool'
	},

	highlight: false,

	remarkPlugins: [],
	rehypePlugins: [slug, [externalLinks, { target: '_blank', rel: 'noopener noreferrer' }], codeblockWrapper]
});

export default config;
