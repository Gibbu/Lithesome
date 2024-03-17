import { calculateIndex, disableScroll, type CalcIndexAction, type UID } from '$lib/internal/index.js';

export const createContext = (uid: UID) => {
	// Internal state
	let visible = $state<boolean>(false);
	let hoveredIndex = $state<number>(-1);
	let trigger = $state<HTMLElement | null>(null);
	let items = $state<string[]>([]);

	// Derived state
	const hoveredItem = $derived(items[hoveredIndex]);

	// Effects
	$effect(() => {
		disableScroll(visible && !document.body.style.overflow);
	});
	$effect(() => {
		if (!visible) hoveredIndex = -1;
	});

	// Functions
	const functions = {
		open() {
			visible = true;
		},
		close() {
			visible = false;
		},
		toggle() {
			visible = !visible;
		},
		navigateItems(action: CalcIndexAction) {
			hoveredIndex = calculateIndex(action, items, hoveredIndex);
		},
		register(item: string) {
			items = [...items, item];
		},
		unregister(item: string) {
			items = items.filter((el) => el === item);
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
