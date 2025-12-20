import type { FloatingConfig, Props, PropsNoRender } from '$lib/internals/types.js';

//
// ~~ROOT
//
export interface HovercardProps<S = any> extends PropsNoRender<S> {
	visible?: boolean;
	disabled?: boolean;
	delay?: number | [number, number];
	portalTarget?: HTMLElement | string;
	floatingConfig?: FloatingConfig;
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
