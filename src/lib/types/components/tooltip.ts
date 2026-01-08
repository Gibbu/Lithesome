import type { FloatingContent, Props, PropsNoRender } from '$lib/internals/types.js';

//
// ~~ROOT
//
export interface TooltipProps extends PropsNoRender<TooltipState>, FloatingContent {
	/**
	 * The delay in `ms` in which it will take for the content show.
	 *
	 * Passing a number will set both in and out delays.\
	 * Passing an array of two indexes will apply the `[in, out]` delays.
	 */
	delay?: number | [number, number];
}
export interface TooltipState {
	/**
	 * True if the contents are visible.
	 */
	visible: boolean;
}

//
// ~~TRIGGER
//
export interface TooltipTriggerProps<P = any> extends Props<HTMLElement, P, TooltipTriggerState> {}
export interface TooltipTriggerState {
	/**
	 * True if the contents are visible.
	 */
	visible: boolean;
}

//
// ~~CONTENT
//
export interface TooltipContentProps<P = any> extends Props<HTMLElement, P, TooltipContentState> {}
export interface TooltipContentState {
	/**
	 * True if the contents are visible.
	 */
	visible: boolean;
}

//
// ~~ARROW
//
export interface TooltipArrowProps<P = any> extends Props<HTMLElement, P, TooltipArrowState> {}
export interface TooltipArrowState {
	/**
	 * True if the contents are visible.
	 */
	visible: boolean;
}
