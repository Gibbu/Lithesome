import { calculateIndex, Context, effects, type JsonValue, type CalcIndexAction } from '$lib/internal/index.js';

interface Item {
	id: string;
	value: JsonValue;
	disabled?: boolean;
}

interface Init {
	value: JsonValue;
}

interface Hooks {
	onChange: (value: JsonValue) => void;
}

export class RadiogroupContext extends Context<Hooks> {
	items = $state<Item[]>([]);
	value = $state<JsonValue>();
	selectedIndex = $state<number>(-1);

	selectedItem = $derived(
		this.items[this.selectedIndex] || (this.items.length > 0 && this.items.find((el) => el.value === this.value))
	);

	constructor(init: Init, hooks: Hooks) {
		super('radiogroup', hooks);

		this.value = init.value;
	}

	register(item: Item) {
		this.items.push(item);
	}
	navigate(action: CalcIndexAction) {
		this.selectedIndex = calculateIndex(action, this.items, this.selectedIndex);
		(
			document.querySelector(`[data-radiogroupitem][data-value="${this.selectedItem.value}"]`) as HTMLButtonElement
		)?.focus();
	}
	setSelected(item: Item) {
		this.selectedIndex = this.items.findIndex((el) => el.value === item.value);
	}

	#effects = effects(() => {
		$effect(() => {
			this.hooks?.onChange?.(this.selectedItem.value);
		});
	});
}
