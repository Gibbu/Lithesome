import type { Orientation, Props } from '$lib/internals/index.js';

//
// ~~ROOT
//
export interface TabsProps<P = any> extends Props<HTMLElement, P, TabsState> {
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
export interface TabsState {
	/**
	 * The value of the current active tab.
	 */
	activeTab: string;
}

//
// ~~LIST
//
export interface TabsListProps<P = any> extends Props<HTMLElement, P, TabsListState> {}
export interface TabsListState {
	/**
	 * The value of the current active tab.
	 */
	activeTab: string;
}

//
// ~~BUTTON
//
export interface TabsButtonProps<P = any> extends Props<HTMLButtonElement, P, TabsButtonState> {
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
export interface TabsButtonState {
	/**
	 * True if the item is active.
	 */
	active: boolean;
}

//
// ~~CONTENT
//
export interface TabsContentProps<P = any> extends Props<HTMLElement, P, TabsContentState> {
	/**
	 * The unique ID of the panel.
	 */
	value: string;
}
export interface TabsContentState {
	/**
	 * True if the item is active.
	 */
	active: boolean;
}
