import { error } from '@sveltejs/kit';
import { compile } from 'mdsvex';

import type { DocsPageMeta } from '$site/index.js';
export const prerender = true;

interface Route extends DocsPageMeta {
	children?: DocsPageMeta[];
}

export const load = async () => {
	const pages = Object.entries(
		import.meta.glob('/src/docs/**/*.md', { query: '?raw', import: 'default' })
	);

	let routes: Route[] = [];

	for (const [path, resolver] of pages) {
		const page = (await resolver()) as string;

		const match = await compile(page);

		if (!match) error(500, 'Cannot find that file.');
		const meta = match.data?.fm as DocsPageMeta;

		if (!meta) error(500, `Cannot find any meta. ${path}`);
		if (!meta.title) error(500, `Provide title metadata. ${path}`);

		const title = meta.sidebar || meta.title;
		const _path = path.replace(/\/src\/docs\/|\/index/g, '').replace('index', '/');
		const object = {
			title,
			path: _path.replace('.md', ''),
			badge: meta.badge,
			sidebar: meta.sidebar
		};

		const index = routes.findIndex((el) => _path.startsWith(el.path));
		if (routes[index]) {
			if (!routes[index].children) routes[index].children = [];
			routes[index].children?.push(object);
		} else {
			routes = [...routes, object];
		}
	}

	return {
		routes
	};
};
