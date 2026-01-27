import type { FloatingContent, JsonValue, Props, PropsNoChildren, PropsNoRender } from '$lib/internals/index.js';

//
// ~ROOT
//
export interface SelectProps<V extends JsonValue = any> extends PropsNoRender<SelectState>, FloatingContent {
	/**
	 * The currently selected option(s).
	 *
	 * ### `$bindable`
	 */
	value?: V;
	/**
	 * Allows multiple options to be selected at once.
	 */
	multiple?: boolean;
	/**
	 * Fires whenever the `value` prop changes.
	 * @param value The new value
	 */
	onValueChanged?: (value: V) => void;
}
export interface SelectState {
	/**
	 * True if the contents are visible.
	 */
	visible: boolean;
}

//
// ~TRIGGER
//
export interface SelectTriggerProps<P = any> extends Props<HTMLButtonElement, P, SelectTriggerState> {}
export interface SelectTriggerState {
	/**
	 * True if the contents are visible.
	 */
	visible: boolean;
}

//
// ~CONTENT
//
export interface SelectContentProps<P = any> extends Props<HTMLElement, P, SelectContentState> {}
export interface SelectContentState {
	/**
	 * True if the contents are visible.
	 */
	visible: boolean;
}

//
// ~ARROW
//
export interface SelectArrowProps<P = any> extends Props<HTMLElement, P, SelectArrowState> {}
export interface SelectArrowState {
	/**
	 * True if the contents are visible.
	 */
	visible: boolean;
}

//
// ~OPTION
//
export interface SelectOptionProps<P = any> extends Props<HTMLButtonElement, P, SelectOptionState> {
	/**
	 * The value of the option.
	 */
	value: JsonValue;
	/**
	 * Disables the option, skipping mouse/keyboard navigation and stopping events from firing.
	 *
	 * ### `$bindable`
	 */
	disabled?: boolean;
	/**
	 * The label to be display on the option and if this option is selected.
	 *
	 * If this prop is not provided, the text content of the option is used.
	 */
	label?: string;
}
export interface SelectOptionState {
	/**
	 * True if the option is hovered.
	 */
	hovered: boolean;
	/**
	 * True if the option is selected.
	 */
	selected: boolean;
}

//
// ~VALUE
//
export interface SelectValueProps extends PropsNoChildren<HTMLSpanElement, SelectValueState> {
	/**
	 * The value displayed when no option(s) is selected.
	 */
	placeholder?: string;
}
export interface SelectValueState {
	/**
	 * True if the contents are visible.
	 */
	visible: boolean;
	/**
	 * True if no options are selected.
	 */
	placeholderVisible: boolean;
}
