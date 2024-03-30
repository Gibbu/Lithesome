import { createUID } from '$lib/internal/index.js';

export interface Item {
	id: string;
	disabled: boolean;
}

interface InitialValues {
	single?: boolean;
}

export const createContext = (init: InitialValues) => {
	const { uid } = createUID('accordion');

	let items = $state<Item[]>([]);
	let activeItems = $state<string[]>([]);
	let single = $state<boolean>(init.single || false);

	return {
		uid,
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
		},
		setSingle(val: boolean) {
			single = val;
		},
		get items() {
			return items;
		},
		get activeItems() {
			return activeItems;
		}
	};
};
