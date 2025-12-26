import type { FloatingContent, Props, PropsNoRender } from '$lib/internals/types.js';

//
// ~~ROOT
//
export interface HovercardProps<S = any> extends PropsNoRender<S>, FloatingContent {
	/**
	 * The delay in `ms` in which it will take for the content show.
	 *
	 * Passing a number will set both in and out delays.\
	 * Passing an array of two indexes will apply the `[in, out]` delays.
	 */
	delay?: number | [number, number];
}

//
// ~~TRIGGER
//
export interface HovercardTriggerProps<P = any, S = any> extends Props<HTMLElement, P, S> {}

//
// ~~CONTENT
//
export interface HovercardContentProps<P = any, S = any> extends Props<HTMLElement, P, S> {}

//
// ~~ARROW
//
export interface HovercardArrowProps<P = any, S = any> extends Props<HTMLElement, P, S> {}
