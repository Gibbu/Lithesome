import type { Props, PropsNoChildren } from '$lib/internals/index.js';

//
// ~ROOT
//
export interface SliderProps<P = any, S = any> extends Props<HTMLElement, P, S> {
	/**
	 * The current value.
	 *
	 * ### `$bindable`
	 */
	value?: number;
	/**
	 * The minimum value.
	 */
	min?: number;
	/**
	 * The maximum value.
	 */
	max?: number;
	/**
	 * The steps between the `min` and `max` props.
	 */
	step?: number;
	/**
	 * The direction in which the slider will be used.
	 */
	orientation?: 'horizontal' | 'vertical';
	/**
	 * Reverse the logic of the `orientation`.
	 */
	reverse?: boolean;
	/**
	 * Disables the entire group, stops all events from firing.
	 *
	 * ### `$bindable`
	 */
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
