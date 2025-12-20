import type { Orientation, Props } from '$lib/internals/index.js';

//
// ~~ROOT
//
export interface TabsProps<P = any, S = any> extends Props<HTMLElement, P, S> {
	value?: string;
	orientation?: Orientation;
}

//
// ~~LIST
//
export interface TabsListProps<P = any, S = any> extends Props<HTMLElement, P, S> {}

//
// ~~BUTTON
//
export interface TabsButtonProps<P = any, S = any> extends Props<HTMLButtonElement, P, S> {
	value: string;
	disabled?: boolean;
}

//
// ~~CONTENT
//
export interface TabsContentProps<P = any, S = any> extends Props<HTMLElement, P, S> {
	value: string;
}
