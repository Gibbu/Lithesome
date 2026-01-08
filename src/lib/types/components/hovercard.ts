import type { FloatingContent, Props, PropsNoRender } from '$lib/internals/types.js';

//
// ~~ROOT
//
export interface HovercardProps extends PropsNoRender<HovercardState>, FloatingContent {
	/**
	 * The delay in `ms` in which it will take for the content show.
	 *
	 * Passing a number will set both in and out delays.\
	 * Passing an array of two indexes will apply the `[in, out]` delays.
	 */
	delay?: number | [number, number];
}
export interface HovercardState {
	/**
	 * True if the contents are visible.
	 */
	visible: boolean;
}

//
// ~~TRIGGER
//
export interface HovercardTriggerProps<P = any> extends Props<HTMLElement, P, HovercardTriggerState> {}
export interface HovercardTriggerState {
	/**
	 * True if the contents are visible.
	 */
	visible: boolean;
}

//
// ~~CONTENT
//
export interface HovercardContentProps<P = any> extends Props<HTMLElement, P, HovercardContentState> {}
export interface HovercardContentState {
	/**
	 * True if the contents are visible.
	 */
	visible: boolean;
}

//
// ~~ARROW
//
export interface HovercardArrowProps<P = any> extends Props<HTMLElement, P, HovercardArrowState> {}
export interface HovercardArrowState {
	/**
	 * True if the contents are visible.
	 */
	visible: boolean;
}
