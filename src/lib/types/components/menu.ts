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
export interface MenuTriggerProps<P = any, S = any> extends Props<HTMLButtonElement, P, S> {}

//
// ~CONTENT
//
export interface MenuContentProps<P = any, S = any> extends Props<HTMLElement, P, S> {}

//
// ~ARROW
//
export interface MenuArrowProps<P = any, S = any> extends Props<HTMLElement, P, S> {}

//
// ~ITEM
//
export interface MenuItemProps<P = any, S = any> extends Props<HTMLElement, P, S> {
	href?: string;
	disabled?: boolean;
	closeOnClick?: boolean;
}

//
// ~SUB
//
export interface MenuSubProps<S = any> extends PropsNoRender<S> {
	name: string;
	visible?: boolean;
	disabled?: boolean;
	floatingConfig?: FloatingConfig;
	portalTarget?: PortalTarget;
}

//
// ~SUB TRIGGER
//
export interface MenuSubTriggerProps<P = any, S = any> extends Props<HTMLButtonElement, P, S> {}

//
// ~CONTENT
//
export interface MenuSubContentProps<P = any, S = any> extends Props<HTMLElement, P, S> {}
