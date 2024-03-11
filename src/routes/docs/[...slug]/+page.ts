import { error } from '@sveltejs/kit';

import type { SvelteComponent } from 'svelte';

export const load = async ({ params }) => {
	const { slug } = params;

	const pages = Object.entries(
		import.meta.glob<{
			default: SvelteComponent;
			metadata: Record<string, string>;
		}>('/src/docs/**/*.md')
	);

	const match = pages.find(([path, resolver]) => {
		const _path = path.replace(/\/src\/docs\/|.md|\/index/g, '');
		if (_path === slug || (!slug.includes('/') && _path === 'index' && slug === ''))
			return { path, resolver };
	});

	const page = await match?.[1]?.();

	if (!page) error(404, 'Page not found');
	if (!page.metadata?.title) error(500, 'Provide title metadata');

	return {
		component: page.default,
		meta: page.metadata,
		path: match?.[0]
	};
};
