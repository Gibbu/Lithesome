import { tick } from 'svelte';
import { addEvents, attach, buildContext, calculateIndex, createAttributes, KEYS } from '$lib/internals/index.js';

import type { CalcIndexAction } from '$lib/internals/index.js';
import type { GetInternalProps } from '$lib/internals/types.js';
import type { RadioGroupItemProps, RadioGroupProps } from '$lib/types/index.js';

const { attrs, selectors } = createAttributes('radiogroup', ['root', 'item']);

interface InternalRadioGroupItem {
	id: string;
	value: string;
}

//
// ~ROOT
//
type RootProps = GetInternalProps<RadioGroupProps>;
class RadioGroupRoot {
	$id: RootProps['id'];
	$value: RootProps['value'];
	$disabled: RootProps['disabled'];

	items = $state<InternalRadioGroupItem[]>([]);
	selectedIndex = $state<number>(-1);

	SelectedItem = $derived.by<InternalRadioGroupItem | null>(() => this.items[this.selectedIndex] || null);

	constructor(props: RootProps) {
		this.$id = props.id;
		this.$value = props.value;
		this.$disabled = props.disabled;

		if (this.$value.val) this.setInitialSelected();
	}

	navigate = (action: CalcIndexAction) => {
		this.selectedIndex = calculateIndex(action, this.items, this.selectedIndex);

		if (this.SelectedItem) {
			const item = document.querySelector(`#${this.SelectedItem.id}`) as HTMLElement;
			if (item) {
				item.focus();
				this.$value.val = this.SelectedItem.value;
			}
		}
	};
	setSelectedItem = (value: string) => {
		this.selectedIndex = this.items.findIndex((item) => item.value === value);
		this.$value.val = value;
	};
	setInitialSelected = async () => {
		await tick();
		this.selectedIndex = this.items.findIndex((item) => item.value === this.$value.val);
	};

	props = $derived.by(() => ({
		id: this.$id,
		[attrs.root]: ''
	}));
	state = $derived.by(() => ({
		value: this.$value.val,
		disabled: this.$disabled.val
	}));
}

//
// ~ITEM
//
type ItemProps = GetInternalProps<RadioGroupItemProps>;
class RadioGroupItem {
	$id: ItemProps['id'];
	$value: ItemProps['value'];
	$disabled: ItemProps['disabled'];

	_root: RadioGroupRoot;

	Selected = $derived.by(() => this._root.SelectedItem?.id === this.$id);

	constructor(root: RadioGroupRoot, props: ItemProps) {
		this._root = root;

		this.$id = props.id;
		this.$value = props.value;
		this.$disabled = props.disabled;

		this._root.items.push({ id: this.$id, value: this.$value.val });
	}

	props = $derived.by(() => ({
		id: this.$id,
		[attrs.item]: '',
		type: 'button',
		role: 'radio',
		disabled: this.$disabled.val,
		'aria-checked': this.Selected,
		tabindex: !this._root.SelectedItem && this._root.items[0] ? 0 : this.Selected ? 0 : -1,
		'data-radiogroupitem': '',
		'data-value': this.$value.val,
		'data-checked': this.Selected || undefined,
		...attach((node) =>
			addEvents(node, {
				click: () => {
					if (this._root.$disabled.val || this.$disabled.val) return;

					this._root.setSelectedItem(this.$value.val);
				},
				keydown: (e) => {
					const { key } = e;

					if (key === KEYS.arrowUp || key === KEYS.arrowDown || key === KEYS.end || key === KEYS.home)
						e.preventDefault();
					if (key === KEYS.home) this._root.navigate('first');
					if (key === KEYS.end) this._root.navigate('last');
					if (key === KEYS.arrowUp) this._root.navigate('prev');
					if (key === KEYS.arrowDown) this._root.navigate('next');
				}
			})
		)
	}));
	state = $derived.by(() => ({
		selected: this.Selected
	}));
}

//
// ~BUILDERS
//
const rootCtx = buildContext(RadioGroupRoot);

export const createRadioGroupRootContext = (props: RootProps) => {
	return rootCtx.create(props);
};

export const useRadioGroupItem = (props: ItemProps) => {
	return rootCtx.register(RadioGroupItem, props);
};
