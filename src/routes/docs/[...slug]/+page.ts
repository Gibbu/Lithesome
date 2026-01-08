import { error } from '@sveltejs/kit';
import { parseTypesFromGlob } from './_utils.js';

import type { ComponentReference } from '$site/index.js';
import type { Component } from 'svelte';

export const load = async ({ params }) => {
	const { slug } = params;

	let previewComponent: Component | null = null;
	let previewCode: string | null = null;
	let componentReference: Record<string, ComponentReference> | null = null;

	const pages = Object.entries(
		import.meta.glob<{
			default: Component;
			metadata: Record<string, string>;
		}>('/src/docs/**/*.svx')
	);

	const match = pages.find(([path, resolver]) => {
		const _path = path.replace(/\/src\/docs\/|.svx|\/index/g, '');
		if (_path === slug || (!slug.includes('/') && _path === 'index')) return { path, resolver };
	});

	const page = await match?.[1]?.();

	if (!page) error(404, 'Page not found');
	if (!page.metadata?.title) error(500, 'Provide title metadata');

	if (slug.startsWith('components') || slug.startsWith('attachments')) {
		const components = Object.entries(import.meta.glob<{ default: Component }>('/src/docs/**/component.svelte'));
		for (const [path, fn] of components) {
			if (path.includes(slug.split('/')[1])) {
				previewComponent = (await fn()).default;
				break;
			}
		}

		const code = Object.entries(
			import.meta.glob<{ default: string }>('/src/docs/**/component.svelte', { query: 'raw' })
		);
		for (const [path, fn] of code) {
			if (path.includes(slug.split('/')[1])) {
				previewCode = (await fn()).default;
				break;
			}
		}
	}

	if (slug.startsWith('components')) {
		componentReference = await parseTypesFromGlob(slug.split('/')[1]);
	}

	return {
		component: page.default,
		meta: page.metadata,
		path: match?.[0],
		previewComponent,
		previewCode,
		componentReference
	};
};
