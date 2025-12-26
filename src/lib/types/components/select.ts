import type { FloatingContent, JsonValue, Props, PropsNoChildren, PropsNoRender } from '$lib/internals/index.js';

//
// ~ROOT
//
export interface SelectProps<S = any, V extends JsonValue = any> extends PropsNoRender<S>, FloatingContent {
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

//
// ~TRIGGER
//
export interface SelectTriggerProps<P = any, S = any> extends Props<HTMLButtonElement, P, S> {}

//
// ~CONTENT
//
export interface SelectContentProps<P = any, S = any> extends Props<HTMLElement, P, S> {}

//
// ~ARROW
//
export interface SelectArrowProps<P = any, S = any> extends Props<HTMLElement, P, S> {}

//
// ~OPTION
//
export interface SelectOptionProps<P = any, S = any> extends Props<HTMLElement, P, S> {
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

//
// ~VALUE
//
export interface SelectValueProps<S = any> extends PropsNoChildren<HTMLElement, S> {
	/**
	 *
	 */
	placeholder?: string;
}
