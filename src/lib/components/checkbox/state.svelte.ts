import { SvelteMap } from 'svelte/reactivity';
import { addEvents, attach, buildContext, createAttributes } from '$lib/internals/index.js';

import type { GetInternalProps } from '$lib/internals/types.js';
import type { CheckboxButtonProps, CheckboxGroupProps, CheckboxLabelProps } from '$lib/types/index.js';

const { attrs } = createAttributes('checkbox', ['group', 'button', 'group', 'label']);

//
// ~GROUP
//
type GroupProps = GetInternalProps<CheckboxGroupProps>;
class CheckboxGroup {
	$$: GroupProps;

	sharedIds = new SvelteMap<'button' | 'label', string>();

	constructor(props: GroupProps) {
		this.$$ = props;
	}

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.group]: ''
	}));
	state = $derived.by(() => ({
		/**
		 * True if the button is checked.
		 */
		checked: this.$$.checked.val,
		/**
		 * True if the group is disabled.
		 */
		disabled: this.$$.disabled.val
	}));
}

//
// ~BUTTON
//
type ButtonProps = GetInternalProps<CheckboxButtonProps>;
class CheckboxButton {
	$$: ButtonProps;

	_group?: CheckboxGroup;

	Checked = $derived.by(() => this._group?.$$.checked.val || this.$$.checked.val);
	Disabled = $derived.by(() => this._group?.$$.disabled.val || this.$$.disabled.val);
	CheckedBool = $derived.by(() => !!this.Checked);

	constructor(props: ButtonProps, group?: CheckboxGroup) {
		this.$$ = props;

		if (group) {
			this._group = group;
			this._group.sharedIds.set('button', this.$$.id.val);
		}
	}

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.button]: '',
		role: 'checkbox',
		type: 'button',
		'aria-checked': this.Checked,
		'aria-required': this.$$.required.val || undefined,
		'aria-labelledby': this._group?.sharedIds.get('label'),
		disabled: this.Disabled || undefined,
		...attach((node) =>
			addEvents(node, {
				click: () => {
					if (this.Disabled) return;
					if (this._group) {
						this._group.$$.checked.val = !this._group.$$.checked.val;
						this.$$.checked.val = this._group.$$.checked.val;
					} else this.$$.checked.val = !this.$$.checked.val;
				}
			})
		)
	}));
	state = $derived.by(() => ({
		/**
		 * True if the button is checked.
		 */
		checked: this.Checked,
		/**
		 * True if the group is disabled.
		 */
		disabled: this.Disabled
	}));
}

//
// ~LABEL
//
type LabelProps = GetInternalProps<CheckboxLabelProps>;
class CheckboxLabel {
	$$: LabelProps;

	_group: CheckboxGroup;

	constructor(group: CheckboxGroup, props: LabelProps) {
		this.$$ = props;

		this._group = group;

		this._group.sharedIds.set('label', this.$$.id.val);
	}

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.label]: '',
		for: this._group.sharedIds.get('button')
	}));
	state = $derived.by(() => ({
		/**
		 * True if the button is checked.
		 */
		checked: this._group.$$.checked.val,
		/**
		 * True if the group is disabled.
		 */
		disabled: this._group.$$.disabled.val
	}));
}

//
// ~BUILDERS
//
const rootCtx = buildContext(CheckboxGroup);

export const createCheckboxGroupContext = (props: GroupProps) => {
	return rootCtx.create(props);
};

export const useCheckboxButton = (props: ButtonProps) => {
	return new CheckboxButton(props, rootCtx.get());
};

export const useCheckboxLabel = (props: LabelProps) => {
	return rootCtx.register(CheckboxLabel, props);
};
