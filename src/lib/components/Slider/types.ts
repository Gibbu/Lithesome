import type { Handler, Props, PropsNoChildren } from '$internal';

interface SliderState {
	/** The current percentage of the slider, from 0-100. */
	percentage: number;
	/** The current value of the slider. */
	value: number;
}
export interface SliderEvents {
	/**
	 * Add your own custom logic to the mousedown event.\
	 * Using the regular `onmousedown` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onMousedown?: Handler<MouseEvent, HTMLElement>;
	/**
	 * Add your own custom logic to the click event.\
	 * Using the regular `onclick` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onClick?: Handler<MouseEvent, HTMLElement>;
}
export interface SliderProps extends Props<HTMLDivElement, SliderState>, SliderEvents {
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

export interface SliderThumbEvents {
	/**
	 * Add your own custom logic to the click event.\
	 * Using the regular `onkeydown` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onKeydown?: Handler<KeyboardEvent, HTMLElement>;
	/**
	 * Add your own custom logic to the mousedown event.\
	 * Using the regular `onmousedown` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onMousedown?: Handler<MouseEvent, HTMLElement>;
}
export interface SliderThumbProps extends PropsNoChildren<HTMLDivElement, SliderState>, SliderThumbEvents {}

export interface SliderRangeProps extends PropsNoChildren<HTMLDivElement, SliderState> {}

export interface SliderValueProps extends PropsNoChildren<HTMLInputElement> {
	name: string;
}
