import { calculateIndex, type JsonValue, type UID, type CalcIndexAction } from '$lib/internal/index.js';

interface Item {
	id: string;
	value: JsonValue;
	disabled?: boolean;
}

interface Hooks {
	onChange: (value: JsonValue) => void;
}

export const createContext = (uid: UID, value: JsonValue, hooks?: Hooks) => {
	let items = $state<Item[]>([]);
	let selectedIndex = $state<number>(-1);

	const selectedItem = $derived(items[selectedIndex] || (items.length > 0 && items.find((el) => el.value === value)));

	$effect(() => {
		hooks?.onChange?.(selectedItem.value);
	});

	const functions = {
		register(item: Item) {
			items = [...items, item];
		},
		navigateItems(action: CalcIndexAction) {
			selectedIndex = calculateIndex(action, items, selectedIndex);
		},
		setSelected(item: Item) {
			selectedIndex = items.findIndex((el) => el.value === item.value);
		}
	};

	return {
		uid,
		...functions,
		get items() {
			return items;
		},
		get selectedItem() {
			return selectedItem;
		}
	};
};
