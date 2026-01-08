import type { Props, PropsNoChildren } from '$lib/internals/index.js';

//
// ~ROOT
//
export interface SliderProps<P = any> extends Props<HTMLElement, P, SliderState> {
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
export interface SliderState {
	/**
	 * The current value.
	 */
	value: number;
	/**
	 * The current percentage from 0 to 100.
	 */
	percentage: number;
}

//
// ~THUMB
//
export interface SliderThumbProps<P = any> extends Props<HTMLElement, P, SliderThumbState> {}
export interface SliderThumbState {
	/**
	 * The current value.
	 */
	value: number;
	/**
	 * The current percentage from 0 to 100.
	 */
	percentage: number;
}

//
// ~RANGE
//
export interface SliderRangeProps<P = any> extends Props<HTMLElement, P, SliderRangeState> {}
export interface SliderRangeState {
	/**
	 * The current value.
	 */
	value: number;
	/**
	 * The current percentage from 0 to 100.
	 */
	percentage: number;
}

//
// ~VALUE
//
export interface SliderValueProps extends PropsNoChildren<HTMLElement, any> {}
