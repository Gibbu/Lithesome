import type { Props } from '$lib/internals/index.js';

export type CheckboxChecked = boolean | 'mixed';

//
// ~GROUP
//
export interface CheckboxGroupProps<P = any, S = any> extends Props<HTMLElement, P, S> {
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

//
// ~BUTTON
//
export interface CheckboxButtonProps<P = any, S = any> extends Props<HTMLButtonElement, P, S> {
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

//
// ~LABEL
//
export interface CheckboxLabelProps<P = any, S = any> extends Props<HTMLLabelElement, P, S> {}
