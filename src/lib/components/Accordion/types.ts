import type { BaseProps, Handler, Transition } from '$lib/internal/index.js';

interface AccordionState {
	/** True if any item is opened. */
	active: boolean;
}
export interface AccordionProps extends BaseProps<HTMLDivElement, AccordionState> {
	/** Allow only a singluar `AccordionItem` to be opened at once. */
	single?: boolean;
}

interface AccordionContentState {
	/** True if any item is opened. */
	active: boolean;
}
export interface AccordionContentProps extends BaseProps<HTMLDivElement, AccordionContentState> {
	/**
	 * The `svelte/transtion` you wish to use.
	 *
	 * @see https://lithesome.dev/docs/api#transition-prop
	 */
	transition?: Transition;
}

export interface AccordionHeadingProps extends BaseProps<HTMLDivElement> {
	/** The `aria-level` to be set. */
	level?: 1 | 2 | 3 | 4 | 5 | 6;
}

interface AccordionButtonState {
	/** True if the item is opened. */
	active: boolean;
	/** True if the item is disabled. */
	disabled: boolean;
}
export interface AccordionButtonProps extends BaseProps<HTMLButtonElement, AccordionButtonState> {
	onClick?: Handler<MouseEvent, HTMLButtonElement>;
}

interface AccordionItemState {
	/** True if the item is opened. */
	active: boolean;
	/** True if the item is disabled. */
	disabled: boolean;
}
export interface AccordionItemProps extends BaseProps<HTMLDivElement, AccordionItemState> {
	/** Disables the items, disallowing clicking and keyboard navigation. */
	disabled?: boolean;
}
