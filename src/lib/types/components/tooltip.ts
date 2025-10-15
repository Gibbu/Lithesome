import type { FloatingConfig, Props, PropsNoRender } from '$lib/internals/types.js';

//
// ~~ROOT
//
export interface TooltipProps<S = any> extends PropsNoRender<S> {
	visible?: boolean;
	disabled?: boolean;
	delay?: number | [number, number];
	portalTarget?: HTMLElement | string;
	floatingConfig?: FloatingConfig;
}

//
// ~~TRIGGER
//
export interface TooltipTriggerProps<A = any, S = any> extends Props<HTMLElement, A, S> {}

//
// ~~CONTENT
//
export interface TooltipContentProps<A = any, S = any> extends Props<HTMLElement, A, S> {}

//
// ~~ARROW
//
export interface TooltipArrowProps<A = any, S = any> extends Props<HTMLElement, A, S> {}
