import {
	buildContext,
	calculateIndex,
	createUID,
	KEYS,
	removeDisabledElements,
	type CalcIndexAction,
	type JsonValue,
	type ContextChange,
	type UID
} from '$internal';

interface Item {
	id: string;
	value: JsonValue;
	disabled?: boolean;
}

//
// Root
//
interface RadioGroupRootProps {
	value: JsonValue;
	required: boolean;
}
class RadioGroupRoot {
	uid: UID = createUID('radiogroup').uid;
	items = $state<string[]>([]);
	index = $state<number>(-1);
	value = $state<JsonValue>(null);
	required = $state<boolean>(false);

	SelectedItem = $derived.by(() => {
		const elements = this.queryElements();

		if (!elements) return;
		return elements[this.index];
	});

	constructor(props: ContextChange<RadioGroupRootProps>) {
		this.value = props.value;

		$effect(() => {
			props.onContextChange({ value: this.value, required: this.required });
		});
	}
	onComponentChange = (props: RadioGroupRootProps) => {
		this.value = props.value;
		this.required = props.required;
	};

	queryElements = () => {
		return removeDisabledElements(`[data-radiogroup][id="${this.uid()}"] [data-radiogroupitem]`);
	};
	navigate = (action: CalcIndexAction) => {
		const elements = this.queryElements();
		if (!elements) return;

		this.index = calculateIndex(action, this.items, this.index);

		const element = elements[this.index];
		if (!element) return;

		this.value = element.dataset.value!;
		this.SelectedItem?.focus();
	};
	setSelected = (item: Item) => {
		if (item.disabled) return;

		const elements = this.queryElements();
		if (!elements) return;

		this.index = elements.findIndex((el) => el.dataset.value === item.value);
		this.value = item.value;
	};

	attrs = $derived.by(
		() =>
			({
				id: this.uid(),
				role: 'radiogroup',
				'aria-required': this.required,
				'data-radiogroup': ''
			}) as const
	);
}

//
// Item
//
interface RadioGroupItemProps {
	value: JsonValue;
	disabled: boolean;
}
class RadioGroupItem {
	root: RadioGroupRoot;
	uid: UID = createUID('radioitem').uid;
	value = $state<JsonValue>(null);
	disabled = $state<boolean>(false);

	Checked = $derived.by(() => this.root.SelectedItem?.id === this.uid());

	constructor(root: RadioGroupRoot, props: ContextChange<RadioGroupItemProps>) {
		this.root = root;
		this.value = props.value;
		this.disabled = props.disabled;

		this.root.items.push(this.uid());

		$effect(() => {
			props.onContextChange({ value: this.value, disabled: this.disabled });
		});
	}
	onComponentChange = (props: RadioGroupItemProps) => {
		this.value = props.value;
		this.disabled = props.disabled;
	};

	#handleClick = () => {
		if (this.disabled) return;

		this.root.setSelected({
			id: this.uid(),
			value: this.value,
			disabled: this.disabled
		});
	};
	#handleKeydown = (e: KeyboardEvent) => {
		const { key } = e;

		if (key === KEYS.arrowUp || key === KEYS.arrowDown || key === KEYS.end || key === KEYS.home) e.preventDefault();
		if (key === KEYS.home) this.root.navigate('first');
		if (key === KEYS.end) this.root.navigate('last');
		if (key === KEYS.arrowUp) this.root.navigate('prev');
		if (key === KEYS.arrowDown) this.root.navigate('next');
	};

	attrs = $derived.by(
		() =>
			({
				id: this.uid(),
				type: 'button',
				role: 'radio',
				disabled: this.disabled,
				'aria-checked': this.Checked,
				tabindex: !this.root.SelectedItem && this.root.items[0] ? 0 : this.Checked ? 0 : -1,
				'data-radiogroupitem': '',
				'data-value': this.value,
				'data-checked': this.Checked || undefined,
				onclick: this.#handleClick,
				onkeydown: this.#handleKeydown
			}) as const
	);
	state = $derived.by(() => ({
		checked: this.Checked
	}));
}

//
// Builders
//
const rootContext = buildContext(RadioGroupRoot);

export const createRootContext = (props: ContextChange<RadioGroupRootProps>) => {
	return rootContext.createContext(props);
};
export const useRadioItem = (props: ContextChange<RadioGroupItemProps>) => {
	return rootContext.register(RadioGroupItem, props);
};
