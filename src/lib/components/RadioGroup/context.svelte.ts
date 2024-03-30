import { calculateIndex, createUID, type JsonValue, type CalcIndexAction } from '$lib/internal/index.js';

interface Item {
	id: string;
	value: JsonValue;
	disabled?: boolean;
}

interface InitialValues {
	value?: JsonValue;
}

interface Hooks {
	onChange: (value: JsonValue) => void;
}

export const createContext = (init: InitialValues, hooks?: Hooks) => {
	const { uid } = createUID('radiogroup');

	let items = $state<Item[]>([]);
	let selectedIndex = $state<number>(-1);

	const selectedItem = $derived(
		items[selectedIndex] || (items.length > 0 && items.find((el) => el.value === init.value))
	);

	$effect(() => {
		hooks?.onChange?.(selectedItem.value);
	});

	return {
		uid,
		register(item: Item) {
			items = [...items, item];
		},
		navigateItems(action: CalcIndexAction) {
			selectedIndex = calculateIndex(action, items, selectedIndex);
			(
				document.querySelector(`[data-radiogroupitem][data-value="${selectedItem.value}"]`) as HTMLButtonElement
			)?.focus();
		},
		setSelected(item: Item) {
			selectedIndex = items.findIndex((el) => el.value === item.value);
		},
		get items() {
			return items;
		},
		get selectedItem() {
			return selectedItem;
		}
	};
};
