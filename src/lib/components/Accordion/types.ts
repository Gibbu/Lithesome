import type { Props, Handler, Transition } from '$internal';

export interface AccordionProps extends Props<HTMLDivElement> {
	/** The value of the active item. */
	value?: string;
	/** Allow only a singluar `AccordionItem` to be opened at once. */
	single?: boolean;
}

export interface AccordionContentProps extends Props<HTMLDivElement> {
	/**
	 * The `svelte/transtion` you wish to use.
	 *
	 * @see https://lithesome.dev/docs/api#transition-prop
	 */
	transition?: Transition;
}

export interface AccordionHeadingProps extends Props<HTMLDivElement> {
	/** The `aria-level` to be set. */
	level?: 1 | 2 | 3 | 4 | 5 | 6;
}

interface AccordionButtonState {
	/** True if the item is opened. */
	active: boolean;
	/** True if the item is disabled. */
	disabled: boolean;
}
export interface AccordionButtonProps extends Props<HTMLButtonElement, AccordionButtonState> {}

interface AccordionItemState {
	/** True if the item is opened. */
	active: boolean;
	/** True if the item is disabled. */
	disabled: boolean;
}
export interface AccordionItemProps extends Props<HTMLDivElement, AccordionItemState> {
	/** Disables the items, disallowing clicking and keyboard navigation. */
	disabled?: boolean;
}
