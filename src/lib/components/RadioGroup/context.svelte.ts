import { calculateIndex, Context, effects, type JsonValue, type CalcIndexAction } from '$internal';

interface Item {
	id: string;
	value: JsonValue;
	disabled?: boolean;
}

interface Init {
	value?: JsonValue;
}

interface Hooks {
	onChange: (value: JsonValue) => void;
}

export class RadiogroupContext extends Context<Hooks> {
	items = $state<Item[]>([]);
	value = $state<JsonValue>();
	selectedIndex = $state<number>(-1);

	selectedItem = $derived<Item | null>(
		this.items[this.selectedIndex] ||
			(this.items.length > 0 && this.items.find((el) => el.value === this.value)) ||
			null
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
			document.querySelector(`[data-radiogroupitem][data-value="${this.selectedItem?.value}"]`) as HTMLButtonElement
		)?.focus();
	}
	setSelected(item: Item) {
		this.selectedIndex = this.items.findIndex((el) => el.value === item.value);
	}

	#effects = effects(() => {
		$effect(() => {
			if (this.selectedItem) this.hooks?.onChange?.(this.selectedItem?.value);
		});
	});
}
