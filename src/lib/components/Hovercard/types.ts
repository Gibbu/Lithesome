import type { Props, PropsNoChildren, ContentProps, Handler } from '$internal';

interface HovercardState {
	/** Whether or not the content is opened or not. */
	visible: boolean;
}
export interface HovercardProps extends Props<HTMLDivElement, HovercardState> {
	/** Control the visiblity of the hovercard. */
	visible?: boolean;
	/**
	 * The delay between the the content being visible or not.
	 *
	 * Passing an array will allow you to change the delays for in and out.
	 */
	delay?: number | [number, number];
}

export interface HovercardArrowProps extends PropsNoChildren<HTMLDivElement, HovercardState> {}

export interface HovercardContentProps extends Props<HTMLDivElement, HovercardState>, ContentProps {}

export interface HovercardTriggerProps extends Props<HTMLDivElement, HovercardState> {}
