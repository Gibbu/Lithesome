import type { Props } from '$lib/internals/index.js';

//
// ~ROOT
//
export interface RadioGroupProps<P = any, S = any> extends Props<HTMLElement, P, S> {
	value?: string;
	disabled?: boolean;
	onValueChanged?: (value: string) => void;
}

//
// ~ITEM
//
export interface RadioGroupItemProps<P = any, S = any> extends Props<HTMLInputElement, P, S> {
	value: string;
	disabled?: boolean;
}
