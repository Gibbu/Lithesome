import { calculateIndex, type UID, type CalcIndexAction } from '$lib/internal/index.js';

export interface Item {
	id: string;
	disabled: boolean;
}

export const createContext = (uid: UID, single: boolean = false) => {
	let items = $state<Item[]>([]);
	let activeItems = $state<string[]>([]);
	let hoveredIndex = $state<number>(-1);

	const hoveredItem = $derived(items[hoveredIndex]);

	const functions = {
		toggle(itemId: string) {
			hoveredIndex = items.findIndex((el) => el.id === itemId);
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
		navigateItems(action: CalcIndexAction) {
			hoveredIndex = calculateIndex(action, items, hoveredIndex);
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
		},
		get hoveredItem() {
			return hoveredItem;
		}
	};
};
