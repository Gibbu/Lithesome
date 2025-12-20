import type { Props, PropsNoChildren } from '$lib/internals/index.js';

//
// ~ROOT
//
export interface PinProps<P = any, S = any> extends Props<HTMLElement, P, S> {
	value?: string[];
	disabled?: boolean;
	type?: 'text' | 'password';
	placeholder?: string;
	onChanged?: (value: string[]) => void;
	onFilled?: (value: string[]) => void;
}

//
// ~INPUT
//
export interface PinInputProps<S = any> extends PropsNoChildren<HTMLInputElement, S> {}

//
// ~VALUE
//
export interface PinValueProps<S = any> extends PropsNoChildren<HTMLInputElement, S> {
	name?: string;
}
