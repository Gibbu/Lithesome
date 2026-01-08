import type { Props } from '$lib/internals/index.js';

//
// ~ROOT
//
export interface RadioGroupProps<P = any> extends Props<HTMLElement, P, RadioGroupState> {
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
export interface RadioGroupState {
	/**
	 * The current value of the group.
	 */
	value: string;
	/**
	 * True if the group is disabled.
	 */
	disabled: boolean;
}

//
// ~ITEM
//
export interface RadioGroupItemProps<P = any> extends Props<HTMLInputElement, P, RadioGroupItemState> {
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
export interface RadioGroupItemState {
	/**
	 * The current value of the group.
	 */
	selected: boolean;
	/**
	 * True if the group is disabled.
	 */
	disabled: boolean;
}
