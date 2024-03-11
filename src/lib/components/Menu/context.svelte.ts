import { calculateIndex, type CalcIndexAction, type UID } from '$lib/internal/index.js';

export const createContext = (uid: UID) => {
	// Internal state
	let visible = $state<boolean>(false);
	let hoveredIndex = $state<number>(-1);
	let trigger = $state<HTMLElement | null>(null);
	let items = $state<string[]>([]);

	// Derived state
	const hoveredItem = $derived(items[hoveredIndex]);

	// Functions
	const functions = {
		open() {
			visible = true;
		},
		close() {
			visible = false;
			items = [];
			hoveredIndex = -1;
		},
		toggle() {
			visible = !visible;
			if (!visible) functions.close();
		},
		navigateItems(action: CalcIndexAction) {
			hoveredIndex = calculateIndex(action, items, hoveredIndex);
		},
		register(item: string) {
			items = [...items, item];
		},
		setHoveredItem(itemId: string) {
			hoveredIndex = items.findIndex((el) => el === itemId);
		},
		setTrigger(node: HTMLElement) {
			trigger = node;
		}
	};

	return {
		...functions,
		uid,
		get visible() {
			return visible;
		},
		get hoveredIndex() {
			return hoveredIndex;
		},
		get trigger() {
			return trigger;
		},
		get items() {
			return items;
		},
		get hoveredItem() {
			return hoveredItem;
		}
	};
};
