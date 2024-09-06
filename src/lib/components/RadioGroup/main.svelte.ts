import {
	buildContext,
	calculateIndex,
	createUID,
	KEYS,
	removeDisabledElements,
	type CalcIndexAction,
	type StateValues,
	type UID
} from '$internal';
import { tick } from 'svelte';

interface Item {
	id: string;
	value: string;
	disabled?: boolean;
}

//
// Root
//
type RadioGroupRootProps = StateValues<{
	value: string;
	required: boolean;
}>;
class RadioGroupRoot {
	uid: UID = createUID('radiogroup').uid;

	$value: RadioGroupRootProps['value'];
	$required: RadioGroupRootProps['required'];

	items = $state<string[]>([]);
	index = $state<number>(-1);

	SelectedItem = $derived.by(() => {
		const elements = this.queryElements();

		if (!elements) return;

		return elements[this.index];
	});

	constructor(props: RadioGroupRootProps) {
		this.$value = props.value;
		this.$required = props.required;

		if (this.$value.val) {
			tick().then(() => {
				this.index = this.items.findIndex((el) => el === this.$value.val);
			});
		}
	}

	queryElements = () => {
		return removeDisabledElements(`[data-radiogroup][id="${this.uid()}"] [data-radiogroupitem]`);
	};
	navigate = (action: CalcIndexAction) => {
		const elements = this.queryElements();
		if (!elements) return;

		this.index = calculateIndex(action, this.items, this.index);

		const element = elements[this.index];
		if (!element) return;

		this.$value.val = element.dataset.value!;
		this.SelectedItem?.focus();
	};
	setSelected = (item: Item) => {
		if (item.disabled) return;

		const elements = this.queryElements();
		if (!elements) return;

		this.index = elements.findIndex((el) => el.dataset.value === item.value);
		this.$value.val = item.value;
	};

	attrs = $derived.by(
		() =>
			({
				id: this.uid(),
				role: 'radiogroup',
				'aria-required': this.$required.val,
				'data-radiogroup': '',
				'data-value': this.$value.val
			}) as const
	);
}

//
// Item
//
type RadioGroupItemProps = StateValues<{
	value: string;
	disabled: boolean;
}>;
class RadioGroupItem {
	root: RadioGroupRoot;
	uid: UID = createUID('radioitem').uid;

	$value: RadioGroupItemProps['value'];
	$disabled: RadioGroupItemProps['disabled'];

	Checked = $derived.by(() => this.root.SelectedItem?.id === this.uid());

	constructor(root: RadioGroupRoot, props: RadioGroupItemProps) {
		this.root = root;

		this.$value = props.value;
		this.$disabled = props.disabled;

		this.root.items.push(this.$value.val);
	}
	#handleClick = () => {
		if (this.$disabled.val) return;

		this.root.setSelected({
			id: this.uid(),
			value: this.$value.val,
			disabled: this.$disabled.val
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
				disabled: this.$disabled.val,
				'aria-checked': this.Checked,
				tabindex: !this.root.SelectedItem && this.root.items[0] ? 0 : this.Checked ? 0 : -1,
				'data-radiogroupitem': '',
				'data-value': this.$value.val,
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

export const createRootContext = (props: RadioGroupRootProps) => {
	return rootContext.createContext(props);
};
export const useRadioItem = (props: RadioGroupItemProps) => {
	return rootContext.register(RadioGroupItem, props);
};
