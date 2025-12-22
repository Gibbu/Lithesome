import type { Props } from '$lib/internals/index.js';

export type CheckboxChecked = boolean | 'mixed';

//
// ~GROUP
//
export interface CheckboxGroupProps<P = any, S = any> extends Props<HTMLElement, P, S> {
	checked?: CheckboxChecked;
	disabled?: boolean;
	onCheckedChange?: (v: CheckboxChecked) => void;
}

//
// ~BUTTON
//
export interface CheckboxButtonProps<P = any, S = any> extends Props<HTMLButtonElement, P, S> {
	checked?: CheckboxChecked;
	disabled?: boolean;
	name?: string;
	required?: boolean;
	value?: string;
	onCheckedChange?: (v: CheckboxChecked) => void;
}

//
// ~LABEL
//
export interface CheckboxLabelProps<P = any, S = any> extends Props<HTMLLabelElement, P, S> {}
