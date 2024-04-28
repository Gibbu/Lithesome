import type { BaseProps, BasePropsNoChildren, ContentProps, Handler } from '$lib/internal/types.js';

interface HovercardState {
	/** Whether or not the content is opened or not. */
	visible: boolean;
}
export interface HovercardProps extends BaseProps<HTMLDivElement, HovercardState> {
	/**
	 * The delay between the the content being visible or not.
	 *
	 * Passing an array will allow you to change the delays for in and out.
	 */
	delay?: number | [number, number];
}

export interface HovercardArrowProps extends BasePropsNoChildren<HTMLDivElement, HovercardState> {}

export interface HovercardContentProps extends BaseProps<HTMLDivElement, HovercardState>, ContentProps {
	onMouseenter?: Handler<MouseEvent, HTMLDivElement>;
	onMouseleave?: Handler<MouseEvent, HTMLDivElement>;
}

export interface HovercardTriggerProps extends BaseProps<HTMLDivElement, HovercardState> {}
