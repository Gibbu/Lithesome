import type { Handler, Props, PropsNoChildren } from '$internal';

interface SliderState {
	/** The current percentage of the slider, from 0-100. */
	percentage: number;
	/** The current value of the slider. */
	value: number;
}
export interface SliderProps extends Props<HTMLDivElement, SliderState> {
	/** The value of the slider. */
	value?: number;
	/** The minimum value of the slider. */
	min?: number;
	/** The maximum value of the slider. */
	max?: number;
	/** The steps between each step of the value. */
	step?: number;
	/** The direction of the slider. */
	orientation?: 'horizontal' | 'vertical';
	/** Switch the direction the slider. */
	reverse?: boolean;
	/** Disables the slider. */
	disabled?: boolean;
}

export interface SliderThumbProps extends PropsNoChildren<HTMLDivElement, SliderState> {}

export interface SliderRangeProps extends PropsNoChildren<HTMLDivElement, SliderState> {}

export interface SliderValueProps extends PropsNoChildren<HTMLInputElement> {
	name: string;
}
