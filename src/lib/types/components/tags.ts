import type { Props, PropsNoCildren } from '$lib/internals/index.js';

//
// ~ROOT
//
export interface TagsProps<A = any, S = any> extends Props<HTMLElement, A, S> {
	value: string[];
	disabled?: boolean;
	max?: number;
	whitelist?: string[];
	blacklist?: string[];
}

//
// ~ITEM
//
export interface TagsItemProps<A = any, S = any> extends Props<HTMLElement, A, S> {
	value: string;
}

//
// ~DELETE
//
export interface TagsDeleteProps<A = any, S = any> extends Props<HTMLButtonElement, A, S> {
	value: string;
}

//
// ~INPUT
//
export interface TagsInputProps<S = any> extends PropsNoCildren<HTMLInputElement, S> {}
