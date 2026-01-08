import type { Props } from '$lib/internals/types.js';

//
// ~~ROOT
//
export interface AccordionProps<P = any> extends Props<HTMLElement, P, AccordionState> {
	/**
	 * The current value of the accordion.
	 *
	 * ### `$bindable`
	 */
	value?: string | string[];
	/**
	 * Fires whenever the `value` prop is changed.
	 * @param val The new value
	 */
	onChange?: (val: string | string[]) => void;
}
export interface AccordionState {
	/**
	 * The value of the selected item(s).
	 */
	value: string | string[];
}

//
// ~~ITEM
//
export interface AccordionItemProps<P = any> extends Props<HTMLElement, P, AccordionItemState> {
	/**
	 * The value of the item.
	 */
	value: string;
	/**
	 * Disables the item, stop events from firing and skips over via keyboard navigation.
	 *
	 * ### `$bindable`
	 */
	disabled?: boolean;
}
export interface AccordionItemState {
	/**
	 * True if the item is active.
	 */
	active: boolean;
	/**
	 * True the item is disabled.
	 */
	disabled: boolean;
}

//
// ~~HEADING
//
export interface AccordionHeadingProps<P = any> extends Props<HTMLElement, P, AccordionHeadingState> {
	level?: 1 | 2 | 3 | 4 | 5 | 6;
}
export interface AccordionHeadingState {
	/**
	 * True if the item is active.
	 */
	active: boolean;
}

//
// ~~BUTTON
//
export interface AccordionButtonProps<P = any> extends Props<HTMLButtonElement, P, AccordionButtonState> {}
export interface AccordionButtonState {
	/**
	 * True if the item is active.
	 */
	active: boolean;
	/**
	 * True the item is disabled.
	 */
	disabled: boolean;
}

//
// ~~CONTENT
//
export interface AccordionContentProps<P = any> extends Props<HTMLElement, P, AccordionContentState> {}
export interface AccordionContentState {
	/**
	 * True if the item is active.
	 */
	active: boolean;
}
