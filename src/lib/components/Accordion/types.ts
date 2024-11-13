import type { Props, Handler, Transition } from '$internal';

/**
 * The state that is exposed from the `Accordion` component.\
 * Which can be used via the `class` prop function or `children` snippet block.
 */
export interface AccordionState {
	value: string[];
}
export interface AccordionProps extends Props<HTMLDivElement> {
	/**
	 * The value of the active item.\
	 *
	 * If items have no value set, the unique ID will be used.
	 */
	value?: string[];
	/** Allow only a singluar `AccordionItem` to be opened at once. */
	single?: boolean;
	/**
	 * An event that fires everytime the Accordion `value` prop changes.
	 * @param values The current values of the Accordion.
	 */
	onChange?: (values: string[]) => void;
}

/**
 * The state that is exposed from the `AccordionContent` component.\
 * Which can be used via the `class` prop function or `children` snippet block.
 */
export interface AccordionContentState {
	active: boolean;
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

/**
 * The state that is exposed from the `AccordionButton` component.\
 * Which can be used via the `class` prop function or `children` snippet block.
 */
export interface AccordionButtonState {
	/** True if the item is opened. */
	active: boolean;
	/** True if the item is disabled. */
	disabled: boolean;
}
export interface AccordionButtonEvents {
	/**
	 * Add your own custom logic to the click event.\
	 * Using the regular `onclick` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onClick?: Handler<MouseEvent, HTMLButtonElement>;
}
export interface AccordionButtonProps extends Props<HTMLButtonElement, AccordionButtonState>, AccordionButtonEvents {}

/**
 * The state that is exposed from the `AccordionItem` component.\
 * Which can be used via the `class` prop function or `children` snippet block.
 */
export interface AccordionItemState {
	/** True if the item is opened. */
	active: boolean;
	/** True if the item is disabled. */
	disabled: boolean;
}
export interface AccordionItemProps extends Props<HTMLDivElement, AccordionItemState> {
	/**
	 * The value of the accordion item.\
	 *
	 * If no value is set, unique ID is used.
	 */
	value?: string;
	/** Disables the items, disallowing clicking and keyboard navigation. */
	disabled?: boolean;
}
