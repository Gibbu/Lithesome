import type { Handler, Props, Transition } from '$internal';

/**
 * The state that is exposed from the `Collapsible` components.\
 * Which can be used via the `class` prop function or `children` snippet block.
 */
export interface CollapsibleState {
	/** Whether or not the collapsible content is visible. */
	visible: boolean;
}

export interface CollapsibleProps extends Props<HTMLElement, CollapsibleState> {
	/** Whether or not the collapsible content is visible. */
	visible?: boolean;
	/** Disables the entire collapsible component tree. */
	disabled?: boolean;
	/** An event that fires when the `visible` prop changes. */
	onChange?: (value: boolean) => void;
}

export interface CollapsibleButtonEvents {
	/**
	 * Add your own custom logic to the click event.\
	 * Using the regular `onclick` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onClick?: Handler<MouseEvent, HTMLButtonElement>;
}
export interface CollapsibleButtonProps extends Props<HTMLButtonElement, CollapsibleState>, CollapsibleButtonEvents {}

export interface CollapsibleContentProps extends Props<HTMLElement> {
	/**
	 * The `svelte/transtion` you wish to use.
	 *
	 * @see https://lithesome.dev/docs/api#transition-prop
	 */
	transition?: Transition;
}
