import { type UID, type CalcIndexAction } from '$lib/internal/index.js';

export interface Item {
	id: string;
	disabled: boolean;
}

export const createContext = (uid: UID, single: boolean = false) => {
	let items = $state<Item[]>([]);
	let activeItems = $state<string[]>([]);

	const functions = {
		toggle(itemId: string) {
			if (single) {
				if (activeItems[0] === itemId) activeItems = [];
				else activeItems[0] = itemId;
			} else {
				if (activeItems.includes(itemId)) activeItems = activeItems.filter((el) => el !== itemId);
				else activeItems = [...activeItems, itemId];
			}
		},
		register(item: Item) {
			items = [...items, item];
		},
		setDisabled(id: string, val: boolean) {
			const index = items.findIndex((el) => el.id === id);
			items[index].disabled = val;
		}
	};

	return {
		uid,
		...functions,
		get items() {
			return items;
		},
		get activeItems() {
			return activeItems;
		}
	};
};
