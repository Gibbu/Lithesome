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
import type { RadioGroupItemEvents, RadioGroupState } from './types.js';

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
	uid: UID = createUID('radiogroup');

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

	attrs = $derived.by(() => ({
		id: this.uid(),
		role: 'radiogroup',
		'aria-required': this.$required.val,
		'data-radiogroup': '',
		'data-value': this.$value.val
	}));

	state = $derived.by<RadioGroupState>(() => ({
		value: this.$value.val
	}));
}

//
// Item
//
type RadioGroupItemProps = StateValues<{
	value: string;
	disabled: boolean;
}>;
class RadioGroupItem {
	uid = createUID('radioitem');

	_root: RadioGroupRoot;
	#events: RadioGroupItemEvents;

	$value: RadioGroupItemProps['value'];
	$disabled: RadioGroupItemProps['disabled'];

	Checked = $derived.by(() => this._root.SelectedItem?.id === this.uid());

	constructor(_root: RadioGroupRoot, props: RadioGroupItemProps, events: RadioGroupItemEvents) {
		this._root = _root;
		this.#events = events;

		this.$value = props.value;
		this.$disabled = props.disabled;

		this._root.items.push(this.$value.val);
	}
	#handleClick: RadioGroupItemEvents['onClick'] = (e) => {
		if (this.$disabled.val) return;
		this.#events.onClick?.(e);

		this._root.setSelected({
			id: this.uid(),
			value: this.$value.val,
			disabled: this.$disabled.val
		});
	};
	#handleKeydown: RadioGroupItemEvents['onKeydown'] = (e) => {
		if (this.$disabled.val) return;
		this.#events.onKeydown?.(e);

		const { key } = e;

		if (key === KEYS.arrowUp || key === KEYS.arrowDown || key === KEYS.end || key === KEYS.home) e.preventDefault();
		if (key === KEYS.home) this._root.navigate('first');
		if (key === KEYS.end) this._root.navigate('last');
		if (key === KEYS.arrowUp) this._root.navigate('prev');
		if (key === KEYS.arrowDown) this._root.navigate('next');
	};

	attrs = $derived.by(
		() =>
			({
				id: this.uid(),
				type: 'button',
				role: 'radio',
				disabled: this.$disabled.val,
				'aria-checked': this.Checked,
				tabindex: !this._root.SelectedItem && this._root.items[0] ? 0 : this.Checked ? 0 : -1,
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
const _rootContext = buildContext(RadioGroupRoot);

export const createRootContext = (props: RadioGroupRootProps) => {
	return _rootContext.createContext(props);
};
export const useRadioItem = (props: RadioGroupItemProps, events: RadioGroupItemEvents) => {
	return _rootContext.register(RadioGroupItem, props, events);
};
