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
export interface TooltipTriggerProps<P = any, S = any> extends Props<HTMLElement, P, S> {}

//
// ~~CONTENT
//
export interface TooltipContentProps<P = any, S = any> extends Props<HTMLElement, P, S> {}

//
// ~~ARROW
//
export interface TooltipArrowProps<P = any, S = any> extends Props<HTMLElement, P, S> {}
