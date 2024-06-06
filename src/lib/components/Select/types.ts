import type { Props, PropsNoChildren, ContentProps, Handler, JsonValue } from '$internal';

interface SelectState {
	/** Whether or not the content is opened or not. */
	visible: boolean;
}
export interface SelectProps<T> extends Props<HTMLDivElement, SelectState> {
	/** The value of select. */
	value: T;
	onChange?: (value: T) => void;
}

export interface SelectArrowProps extends PropsNoChildren<HTMLDivElement, SelectState> {}

export interface SelectContentProps extends Props<HTMLDivElement, SelectState>, ContentProps {}

interface SelectOptionState {
	/** If the option is hovered, either via mouse or keyboard. */
	hovered: boolean;
	/** If the option is selected. */
	selected: boolean;
}
export interface SelectOptionProps extends Props<HTMLButtonElement, SelectOptionState> {
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
	onMouseover?: Handler<MouseEvent, HTMLButtonElement>;
}

export interface SelectTriggerProps extends Props<HTMLDivElement, SelectState> {}

interface SelectValueState {
	placeholderVisible: boolean;
}
export interface SelectValueProps extends PropsNoChildren<HTMLSpanElement, SelectValueState> {
	/** The fallback value of no option is selected. */
	placeholder?: string;
}
