import type { Props, PropsNoChildren } from '$lib/internals/index.js';

//
// ~ROOT
//
export interface PinProps<P = any, S = any> extends Props<HTMLElement, P, S> {
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

//
// ~INPUT
//
export interface PinInputProps<S = any> extends PropsNoChildren<HTMLInputElement, S> {}
