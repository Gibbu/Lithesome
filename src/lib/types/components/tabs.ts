import type { Orientation, Props } from '$lib/internals/index.js';

//
// ~~ROOT
//
export interface TabsProps<A = any, S = any> extends Props<HTMLElement, A, S> {
	value?: string;
	orientation?: Orientation;
}

//
// ~~LIST
//
export interface TabsListProps<A = any, S = any> extends Props<HTMLElement, A, S> {}

//
// ~~BUTTON
//
export interface TabsButtonProps<A = any, S = any> extends Props<HTMLButtonElement, A, S> {
	value: string;
	disabled?: boolean;
}

//
// ~~CONTENT
//
export interface TabsContentProps<A = any, S = any> extends Props<HTMLElement, A, S> {
	value: string;
}
