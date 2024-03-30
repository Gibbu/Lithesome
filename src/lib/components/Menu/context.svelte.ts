import { calculateIndex, disableScroll, createUID, type CalcIndexAction } from '$lib/internal/index.js';

export const createContext = () => {
	const { uid } = createUID('menu');

	let visible = $state<boolean>(false);
	let hoveredIndex = $state<number>(-1);
	let trigger = $state<HTMLElement | null>(null);
	let dropdown = $state<HTMLElement | null>(null);
	let items = $state<string[]>([]);

	const hoveredItem = $derived(items[hoveredIndex]);

	$effect(() => {
		disableScroll(visible && !document.body.style.overflow);
	});
	$effect(() => {
		if (!visible) hoveredIndex = -1;
	});

	return {
		uid,
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
		},
		setDropdown(node: HTMLElement) {
			dropdown = node;
		},
		get visible() {
			return visible;
		},
		get hoveredIndex() {
			return hoveredIndex;
		},
		get trigger() {
			return trigger;
		},
		get dropdown() {
			return dropdown;
		},
		get items() {
			return items;
		},
		get hoveredItem() {
			return hoveredItem;
		}
	};
};
