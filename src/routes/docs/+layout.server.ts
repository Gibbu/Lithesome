import { error } from '@sveltejs/kit';
import matter from 'gray-matter';

import type { DocsGroups, DocsPageMeta } from '$site/types.js';

export const load = async () => {
	let groups: DocsGroups[] = [];
	const pages = Object.entries(import.meta.glob('/src/docs/**/*.svx', { query: '?raw', import: 'default' }));
	for (const [filepath, resolver] of pages) {
		if (!filepath.endsWith('.svx')) continue;

		const page = (await resolver()) as string;

		const { data } = matter(page);
		const meta = data as DocsPageMeta;

		if (!meta.title) error(500, `Provide title metadata. ${filepath}`);

		const group = filepath.match(/\/docs\/([^/]+)\//)?.[1]!;
		const path = '/' + filepath.replace(/\/src\/|\/index|.svx/g, '').replace('index', '/');

		const found = groups.find((el) => el.name === group);

		if (found) {
			found.items.push({ ...meta, path });
		} else {
			groups.push({
				name: group,
				items: [{ ...meta, path }]
			});
		}
	}

	const groupOrder = ['intro', 'components', 'attachments'];

	return {
		groups: groups
			.filter((el) => el.name)
			.toSorted((a, b) => groupOrder.indexOf(a.name) - groupOrder.indexOf(b.name))
			.map((section) => ({
				...section,
				items: section.items.toSorted((a, b) => {
					const aTitle = typeof a === 'string' ? a : a.title;
					const bTitle = typeof b === 'string' ? b : b.title;

					const aOrder = a.order;
					const bOrder = b.order;

					if (aOrder && bOrder) return aOrder - bOrder;

					return aTitle.localeCompare(bTitle);
				})
			}))
	};
};
