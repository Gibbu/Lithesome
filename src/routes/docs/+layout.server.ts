import { error } from '@sveltejs/kit';
import { compile } from 'mdsvex';

import type { DocsPageMeta } from '$site/index.js';

export const load = async () => {
	const pages = Object.entries(import.meta.glob('/src/docs/**/*.md', { query: '?raw', import: 'default' }));

	let routes: any[] = [];

	for (const [path, resolver] of pages) {
		const page = (await resolver()) as string;

		const match = await compile(page);

		if (!match) error(500, 'Cannot find that file.');
		const meta = match.data?.fm as DocsPageMeta;

		if (!meta) error(500, `Cannot find any meta. ${path}`);
		if (!meta.title) error(500, `Provide title metadata. ${path}`);

		const title = meta.sidebar || meta.title;
		const order = meta.order;
		const _path = path.replace(/\/src\/docs\/|\/index|.md/g, '').replace('index', '/');
		const route: DocsPageMeta = {
			title,
			description: meta.description,
			path: _path,
			badge: meta.badge,
			sidebar: meta.sidebar,
			order,
			hidden: meta.hidden
		};

		if (_path.includes('/') && !_path.startsWith('/')) {
			const folder = _path.split('/')[0];
			if (routes.find((el) => el.folder === folder)) {
				const index = routes.findIndex((el) => el.folder === folder);
				if (!routes[index].children) routes[index].children = [];
				routes[index].children.push(route);
			} else {
				routes.push({ folder, children: [route] });
			}
		} else {
			routes.push(route);
		}
	}

	return {
		routes: [...routes.filter((el) => !el.children && !el.hidden), ...routes.filter((el) => el.children)].toSorted(
			(a, b) => a.order - b.order
		)
	};
};
