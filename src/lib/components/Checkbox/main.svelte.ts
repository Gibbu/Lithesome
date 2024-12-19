import { buildContext, createUID, type StateValues } from '$internal';

import type { CheckboxButtonEvents, CheckboxState, Checked } from './types.js';

//
// Root
//
type CheckboxProps = StateValues<{
	checked: Checked;
	disabled: boolean;
	required: boolean;
}>;
class CheckboxRoot {
	uid = createUID('checkbox');

	$checked: CheckboxProps['checked'];
	$disabled: CheckboxProps['disabled'];
	$required: CheckboxProps['required'];

	constructor(props: CheckboxProps) {
		this.$checked = props.checked;
		this.$disabled = props.disabled;
		this.$required = props.required;
	}

	state = $derived.by<CheckboxState>(() => ({
		checked: this.$checked.val,
		disabled: this.$disabled.val
	}));
}

//
// Input
//
class CheckboxInput {
	root: CheckboxRoot;

	constructor(root: CheckboxRoot) {
		this.root = root;
	}

	attrs = $derived.by(() => ({
		checked: this.root.$checked.val,
		type: 'checkbox',
		hidden: ''
	}));
}

//
// Label
//
class CheckboxLabel {
	root: CheckboxRoot;

	constructor(root: CheckboxRoot) {
		this.root = root;
	}

	attrs = $derived.by(() => ({
		id: this.root.uid('label'),
		for: this.root.uid('button'),
		'data-checkboxlabel': ''
	}));
	state = $derived.by<CheckboxState>(() => ({
		checked: this.root.$checked.val,
		disabled: this.root.$disabled.val
	}));
}

//
// Button
//
class CheckboxButton {
	root: CheckboxRoot;
	#events: CheckboxButtonEvents;

	constructor(root: CheckboxRoot, events: CheckboxButtonEvents) {
		this.root = root;
		this.#events = events;
	}

	#handleClick: CheckboxButtonEvents['onClick'] = (e) => {
		if (this.root.$disabled.val) return;
		this.#events.onClick?.(e);

		if (this.root.$checked.val === 'mixed') this.root.$checked.val = true;
		else this.root.$checked.val = !this.root.$checked.val;
	};

	attrs = $derived.by(() => ({
		type: 'button',
		id: this.root.uid('button'),
		role: 'checkbox',
		'aria-checked': this.root.$checked.val,
		'aria-required': this.root.$required.val,
		disabled: this.root.$disabled.val,
		'data-checkboxbutton': '',
		'data-state': this.root.$checked.val || undefined,
		onclick: this.#handleClick
	}));
	state = $derived.by<CheckboxState>(() => ({
		checked: this.root.$checked.val,
		disabled: this.root.$disabled.val
	}));
}

//
// Builder
//
const rootCtx = buildContext(CheckboxRoot);

export const createCheckboxRootContext = (props: CheckboxProps) => {
	return rootCtx.createContext(props);
};

export const useCheckboxInput = () => {
	return rootCtx.register(CheckboxInput);
};

export const useCheckboxLabel = () => {
	return rootCtx.register(CheckboxLabel);
};

export const useCheckboxButton = (events: CheckboxButtonEvents) => {
	return rootCtx.register(CheckboxButton, events);
};
