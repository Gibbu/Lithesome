import type { Props } from '$lib/internals/index.js';

//
// ~ROOT
//
export interface RadioGroupProps<P = any, S = any> extends Props<HTMLElement, P, S> {
	/**
	 * The currently selected value.
	 *
	 * ### `$bindable`
	 */
	value?: string;
	/**
	 * Disables the entire group, stops all events from firing.
	 *
	 * ### `$bindable`
	 */
	disabled?: boolean;
	/**
	 * Fires whenever the `value` prop changes.
	 * @param value The new value.
	 */
	onValueChanged?: (value: string) => void;
}

//
// ~ITEM
//
export interface RadioGroupItemProps<P = any, S = any> extends Props<HTMLInputElement, P, S> {
	/**
	 * The unique value of the item.
	 */
	value: string;
	/**
	 * Disables the entire group, stops all events from firing.
	 *
	 * ### `$bindable`
	 */
	disabled?: boolean;
}
