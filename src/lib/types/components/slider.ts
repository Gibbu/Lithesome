import type { Props, PropsNoCildren } from '$lib/internals/index.js';

//
// ~ROOT
//
export interface SliderProps<A = any, S = any> extends Props<HTMLElement, A, S> {
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
export interface SliderThumbProps<S = any> extends PropsNoCildren<HTMLElement, S> {}

//
// ~RANGE
//
export interface SliderRangeProps<S = any> extends PropsNoCildren<HTMLElement, S> {}
//
// ~VALUE
//
export interface SliderValueProps<S = any> extends PropsNoCildren<HTMLElement, S> {}
