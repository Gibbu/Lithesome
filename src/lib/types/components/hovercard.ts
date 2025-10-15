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
export interface HovercardTriggerProps<A = any, S = any> extends Props<HTMLElement, A, S> {}

//
// ~~CONTENT
//
export interface HovercardContentProps<A = any, S = any> extends Props<HTMLElement, A, S> {}

//
// ~~ARROW
//
export interface HovercardArrowProps<A = any, S = any> extends Props<HTMLElement, A, S> {}
