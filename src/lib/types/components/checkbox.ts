import type { Props } from '$lib/internals/index.js';

export type CheckboxChecked = boolean | 'mixed';

//
// ~GROUP
//
export interface CheckboxGroupProps<P = any> extends Props<HTMLElement, P, CheckboxGroupState> {
	/**
	 * The current checked state.
	 *
	 * ### `$bindable`
	 */
	checked?: CheckboxChecked;
	/**
	 * Disables the entire group, stops all events from firing.
	 *
	 * ### `$bindable`
	 */
	disabled?: boolean;
	/**
	 * Fires whenever the `checked` prop is changed.
	 * @param checked The new value
	 */
	onCheckedChange?: (checked: CheckboxChecked) => void;
}
export interface CheckboxGroupState {
	/**
	 * True if the button is checked.
	 */
	checked: CheckboxChecked;
	/**
	 * True if the group is disabled.
	 */
	disabled: boolean;
}

//
// ~BUTTON
//
export interface CheckboxButtonProps<P = any> extends Props<HTMLButtonElement, P, CheckboxButtonState> {
	/**
	 * The current checked state.
	 *
	 * ### `$bindable`
	 */
	checked?: CheckboxChecked;
	/**
	 * Disables the entire group, stops all events from firing.
	 *
	 * ### `$bindable`
	 */
	disabled?: boolean;
	/**
	 * Renders an invisible `input[type="checkbox"]` element to be used for native form submissions.
	 *
	 * If no `value` prop is found, the default value is 'on'
	 */
	name?: string;
	/**
	 * Makes the invisible checkbox required.
	 */
	required?: boolean;
	/**
	 * The value of the invisible checkbox.
	 */
	value?: string;
	/**
	 * Fires whenever the `checked` prop is changed.
	 * @param checked The new value
	 */
	onCheckedChange?: (v: CheckboxChecked) => void;
}
export interface CheckboxButtonState {
	/**
	 * True if the button is checked.
	 */
	checked: CheckboxChecked;
	/**
	 * True if the group is disabled.
	 */
	disabled: boolean;
}

//
// ~LABEL
//
export interface CheckboxLabelProps<P = any> extends Props<HTMLLabelElement, P, CheckboxLabelState> {}
export interface CheckboxLabelState {
	/**
	 * True if the button is checked.
	 */
	checked: CheckboxChecked;
	/**
	 * True if the group is disabled.
	 */
	disabled: boolean;
}
