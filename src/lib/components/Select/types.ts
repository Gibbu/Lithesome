import type { BaseProps, BasePropsNoChildren, ContentProps, Handler, JsonValue } from '$lib/internal/types.js';

interface SelectState {
	/** Whether or not the content is opened or not. */
	visible: boolean;
}
export interface SelectProps<T> extends BaseProps<HTMLDivElement, SelectState> {
	/** The value of select. */
	value: T;
	onChange?: (value: JsonValue) => void;
}

export interface SelectArrowProps extends BasePropsNoChildren<HTMLDivElement, SelectState> {}

export interface SelectContentProps extends BaseProps<HTMLDivElement, SelectState>, ContentProps {}

interface SelectOptionState {
	/** If the option is hovered, either via mouse or keyboard. */
	hovered: boolean;
	/** If the option is selected. */
	selected: boolean;
}
export interface SelectOptionProps extends BaseProps<HTMLButtonElement, SelectOptionState> {
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
	onClick?: Handler<MouseEvent, HTMLButtonElement>;
	onFocus?: Handler<FocusEvent, HTMLButtonElement>;
	onMouseenter?: Handler<MouseEvent, HTMLButtonElement>;
}

export interface SelectTriggerProps extends BaseProps<HTMLDivElement, SelectState> {}

interface SelectValueState {
	placeholderVisibie: boolean;
}
export interface SelectValueProps extends BasePropsNoChildren<HTMLSpanElement> {
	/** The fallback value of no option is selected. */
	placeholder?: string;
}
