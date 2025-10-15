import type { FloatingConfig, PortalTarget, Props, PropsNoRender } from '$lib/internals/types.js';

//
// ~ROOT
//
export interface MenuProps<S = any> extends PropsNoRender<S> {
	visible?: boolean;
	disabled?: boolean;
	floatingConfig?: FloatingConfig;
	portalTarget?: PortalTarget;
}

//
// ~TRIGGER
//
export interface MenuTriggerProps<A = any, S = any> extends Props<HTMLElement, A, S> {}

//
// ~CONTENT
//
export interface MenuContentProps<A = any, S = any> extends Props<HTMLElement, A, S> {}

//
// ~ARROW
//
export interface MenuArrowProps<A = any, S = any> extends Props<HTMLElement, A, S> {}

//
// ~ITEM
//
export interface MenuItemProps<A = any, S = any> extends Props<HTMLElement, A, S> {
	href?: string;
	disabled?: boolean;
	closeOnClick?: boolean;
}

//
// ~SUB
//
export interface MenuSubProps<A = any, S = any> extends Props<HTMLElement, A, S> {
	name: string;
	visible?: boolean;
	disabled?: boolean;
	floatingConfig?: FloatingConfig;
	portalTarget?: PortalTarget;
}

//
// ~SUB TRIGGER
//
export interface MenuSubTriggerProps<A = any, S = any> extends Props<HTMLElement, A, S> {}

//
// ~CONTENT
//
export interface MenuSubContentProps<A = any, S = any> extends Props<HTMLElement, A, S> {}
