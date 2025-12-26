import type { Props } from '$lib/internals/types.js';

//
// ~~ROOT
//
export interface AccordionProps<P = any, S = any> extends Props<HTMLElement, P, S> {
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

//
// ~~ITEM
//
export interface AccordionItemProps<P = any, S = any> extends Props<HTMLElement, P, S> {
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

//
// ~~HEADING
//
export interface AccordionHeadingProps<P = any, S = any> extends Props<HTMLElement, P, S> {
	level?: 1 | 2 | 3 | 4 | 5 | 6;
}

//
// ~~BUTTON
//
export interface AccordionButtonProps<P = any, S = any> extends Props<HTMLButtonElement, P, S> {}

//
// ~~CONTENT
//
export interface AccordionContentProps<P = any, S = any> extends Props<HTMLElement, P, S> {}
