import type { Props, PropsNoChildren } from '$lib/internals/index.js';

//
// ~ROOT
//
export interface PinProps<P = any> extends Props<HTMLElement, P, PinState> {
	/**
	 * The current value of the pin inputs.
	 *
	 * ### `$bindable`
	 */
	value?: string[];
	/**
	 * Disables the entire component tree.
	 *
	 * ### `$bindable`
	 */
	disabled?: boolean;
	/**
	 * The type of input used for each `<PinInput />`
	 */
	type?: 'text' | 'password';
	/**
	 * The placeholder string for each `<PinInput />` if not hovered and no value.
	 */
	placeholder?: string;
	/**
	 * Fires when the `value` prop is changed.
	 * @param value The new value
	 */
	onChanged?: (value: string[]) => void;
	/**
	 * Fires when all inputs have been filled in.
	 * @param value The filled out value.
	 */
	onFilled?: (value: string[]) => void;
}
export interface PinState {
	/**
	 * True if all inputs have a value.
	 */
	filled: boolean;
}

//
// ~INPUT
//
export interface PinInputProps extends PropsNoChildren<HTMLInputElement, PinInputState> {}
export interface PinInputState {
	/**
	 * True if all inputs have a value.
	 */
	filled: boolean;
	/**
	 * True if the root component is true.
	 */
	disabled: boolean;
	/**
	 * True if this specific input is being focused.
	 */
	focused: boolean;
}
