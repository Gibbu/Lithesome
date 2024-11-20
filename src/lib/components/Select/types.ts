import type { Props, PropsNoChildren, ContentProps, Handler, JsonValue, PropsNoElement } from '$internal';

/**
 * The state that is exposed from the `Select` components.\
 * Which can be used via the `class` prop function or `children` snippet block.
 */
export interface SelectState {
	/** Whether or not the content is opened or not. */
	visible: boolean;
}
export interface SelectProps extends PropsNoElement<SelectState> {
	/** The value of select. */
	value: JsonValue;
	visible?: boolean;
	/** Allows for the select content to be visible only when this condition is met. */
	controlled?: boolean;
	onChange?: (value: JsonValue) => void;
}

export interface SelectArrowProps extends PropsNoChildren<HTMLDivElement, SelectState> {}

export interface SelectContentProps extends Props<HTMLDivElement, SelectState>, ContentProps {}

/**
 * The state that is exposed from the `SelectOption` component.\
 * Which can be used via the `class` prop function or `children` snippet block.
 */
export interface SelectOptionState {
	/** If the option is hovered, either via mouse or keyboard. */
	hovered: boolean;
	/** If the option is selected. */
	selected: boolean;
}
export interface SelectOptionEvents {
	/**
	 * Add your own custom logic to the click event.\
	 * Using the regular `onclick` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onClick?: Handler<MouseEvent, HTMLButtonElement>;

	/**
	 * Add your own custom logic to the mouseover event.\
	 * Using the regular `onmouseover` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onMouseover?: Handler<MouseEvent, HTMLButtonElement>;
}
export interface SelectOptionProps extends Props<HTMLButtonElement, SelectOptionState>, SelectOptionEvents {
	/** The value of the option. */
	value: JsonValue;
	/** Disables the option. */
	disabled?: boolean;
	/**
	 * Label of the option.
	 *
	 * If this prop is not provided, the text content will be used.
	 */
	label?: string;
}

export interface SelectTriggerProps extends Props<HTMLDivElement, SelectState> {}

/**
 * The state that is exposed from the `SelectValue` component.\
 * Which can be used via the `class` prop function or `children` snippet block.
 */
export interface SelectValueState {
	placeholderVisible: boolean;
}
export interface SelectValueProps extends PropsNoChildren<HTMLSpanElement, SelectValueState> {
	/** The fallback value of no option is selected. */
	placeholder?: string;
}
