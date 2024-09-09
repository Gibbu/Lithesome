import type { Props, PropsNoChildren, ContentProps, Handler, JsonValue } from '$internal';

export type ComboboxElement = HTMLAnchorElement | HTMLButtonElement;

interface ComboboxState {
	/** Whether or not the content is opened or not. */
	visible: boolean;
}
export interface ComboboxProps extends Props<HTMLDivElement, ComboboxState> {
	/** The current selected value(s) of the combobox. */
	value: JsonValue;
	/** The current selected label(s) of the combobox. */
	label?: string;
	/** Disables the entire combobox component. */
	disabled?: boolean;
	/** Control the visibility of the content list. */
	visible?: boolean;
	/** If the user has modified the selected value in anyway. */
	touched?: boolean;
	onChange?: (payload?: { value?: JsonValue; label?: string }) => void;
}

export interface ComboboxArrowProps extends PropsNoChildren<HTMLDivElement, ComboboxState> {}

export interface ComboboxContentProps extends Props<HTMLDivElement, ComboboxState>, ContentProps {}

export interface ComboboxInputProps extends PropsNoChildren<HTMLInputElement, ComboboxState> {
	/** Bind the value of the input value. */
	value: string;
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
}
