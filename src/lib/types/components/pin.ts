import type { Props, PropsNoCildren } from '$lib/internals/index.js';

//
// ~ROOT
//
export interface PinProps<A = any, S = any> extends Props<HTMLElement, A, S> {
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
export interface PinInputProps<S = any> extends PropsNoCildren<HTMLInputElement, S> {}

//
// ~VALUE
//
export interface PinValueProps<S = any> extends PropsNoCildren<HTMLInputElement, S> {
	name?: string;
}
