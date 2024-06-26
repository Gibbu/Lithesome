import type { Props, PropsNoChildren, ContentProps, Handler, JsonValue } from '$internal';

export type ComboboxElement = HTMLAnchorElement | HTMLButtonElement;

interface ComboboxState {
	/** Whether or not the content is opened or not. */
	visible: boolean;
}
export interface ComboboxProps<T> extends Props<HTMLDivElement, ComboboxState> {
	/** The value of the combobox. */
	value: T;
	/** The label of the selected item. */
	label?: string;
	/** If the user has modified the selected value in anyway. */
	touched?: boolean;
	onChange?: (payload?: { value?: T; label?: string }) => void;
}

export interface ComboboxArrowProps extends PropsNoChildren<HTMLDivElement, ComboboxState> {}

export interface ComboboxContentProps extends Props<HTMLDivElement, ComboboxState>, ContentProps {}

export interface ComboboxInputProps extends PropsNoChildren<HTMLInputElement, ComboboxState> {
	/** Bind the value of the input value. */
	value: string;
	/** Disables the input. */
	disabled?: boolean;
	onClick?: Handler<MouseEvent, HTMLInputElement>;
	onFocus?: Handler<FocusEvent, HTMLInputElement>;
	onKeydown?: Handler<KeyboardEvent, HTMLInputElement>;
}

interface ComboboxOptionState {
	/** If the option is hovered, either via mouse or keyboard. */
	hovered: boolean;
	/** If the option is selected. */
	selected: boolean;
}
export interface ComboboxOptionProps extends Props<ComboboxElement, ComboboxOptionState> {
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
	onClick?: Handler<MouseEvent, ComboboxElement>;
	onFocus?: Handler<FocusEvent, ComboboxElement>;
	onMouseover?: Handler<MouseEvent, ComboboxElement>;
}
