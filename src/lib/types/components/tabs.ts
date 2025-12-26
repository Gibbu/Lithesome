import type { Orientation, Props } from '$lib/internals/index.js';

//
// ~~ROOT
//
export interface TabsProps<P = any, S = any> extends Props<HTMLElement, P, S> {
	/**
	 * The current value.
	 *
	 * ### `$bindable`
	 */
	value?: string;
	/**
	 * The direction of the tabs.
	 */
	orientation?: Orientation;
}

//
// ~~LIST
//
export interface TabsListProps<P = any, S = any> extends Props<HTMLElement, P, S> {}

//
// ~~BUTTON
//
export interface TabsButtonProps<P = any, S = any> extends Props<HTMLButtonElement, P, S> {
	/**
	 * The unique ID of the panel to map this button to.
	 */
	value: string;
	/**
	 * Disables the button, skipping mouse/keyboard navigation and stopping events from firing.
	 *
	 * ### `$bindable`
	 */
	disabled?: boolean;
}

//
// ~~CONTENT
//
export interface TabsContentProps<P = any, S = any> extends Props<HTMLElement, P, S> {
	/**
	 * The unique ID of the panel.
	 */
	value: string;
}
