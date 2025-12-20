import { error } from '@sveltejs/kit';
import matter from 'gray-matter';

import type { Group } from './_types.js';

export const load = async () => {
	let groups: Group[] = [];
	const pages = Object.entries(import.meta.glob('/src/routes/docs/**/*.svx', { query: '?raw', import: 'default' }));
	for (const [filepath, resolver] of pages) {
		const page = (await resolver()) as string;

		try {
			if (!filepath.endsWith('.svx')) return undefined;
			const { data } = matter(page);

			const group = filepath.match(/\/docs\/([^/]+)\//)?.[1]!;
			const href = filepath.replace('/+page.svx', '').replace('src/routes/', '');

			const found = groups.find((el) => el.name === group);

			if (found) {
				found.items.push({ href, data });
			} else {
				groups.push({
					name: group,
					items: [{ href, data }]
				});
			}
		} catch (err) {
			console.error('Error reading directory:', err);
			error(500, 'Failed to read files');
		}
	}

	const groupOrder = ['intro', 'components'];

	return {
		groups: groups
			.toSorted((a, b) => groupOrder.indexOf(a.name) - groupOrder.indexOf(b.name))
			.map((section) => ({
				...section,
				items: section.items.toSorted((a, b) => {
					const aTitle = typeof a === 'string' ? a : a.data.title;
					const bTitle = typeof b === 'string' ? b : b.data.title;
					const aOrder = a.data.order;
					const bOrder = b.data.order;

					if (aOrder && bOrder) return aOrder - bOrder;

					return aTitle.localeCompare(bTitle);
				})
			}))
	};
};
