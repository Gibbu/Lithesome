import type { Props, PropsNoChildren } from '$lib/internals/index.js';

//
// ~ROOT
//
export interface SliderProps<P = any, S = any> extends Props<HTMLElement, P, S> {
	value?: number;
	min?: number;
	max?: number;
	step?: number;
	orientation?: 'horizontal' | 'vertical';
	reverse?: boolean;
	disabled?: boolean;
}

//
// ~THUMB
//
export interface SliderThumbProps<S = any> extends PropsNoChildren<HTMLElement, S> {}

//
// ~RANGE
//
export interface SliderRangeProps<S = any> extends PropsNoChildren<HTMLElement, S> {}
//
// ~VALUE
//
export interface SliderValueProps<S = any> extends PropsNoChildren<HTMLElement, S> {}
