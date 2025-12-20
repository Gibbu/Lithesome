import { error } from 'console';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

import type { Group } from './_types.js';

const pathSplit = process.platform === 'win32' ? '\\' : '/';

export const load = async () => {
	const directoryPath = path.join(process.cwd(), 'src', 'routes', 'docs');
	let groups: Group[] = [];

	try {
		const filenames = await fs.readdir(directoryPath, { recursive: true });
		await Promise.all(
			filenames.map(async (filename) => {
				if (!filename.endsWith('.svx')) return undefined;
				const filePath = path.join(directoryPath, filename);
				const content = await fs.readFile(filePath, 'utf-8');
				const { data } = matter(content);

				// const
				const group = path.dirname(filename).split(pathSplit)[0];
				const href =
					'/docs/' +
					filename
						.split(pathSplit)
						.filter((el) => el !== '+page.svx')
						.join('/');

				const found = groups.find((el) => el.name === group);

				if (found) {
					found.items.push({ href, data });
				} else {
					groups.push({
						name: group,
						items: [{ href, data }]
					});
				}
			})
		);
	} catch (err) {
		console.error('Error reading directory:', err);
		error(500, 'Failed to read files');
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
