import type { Props, PropsNoChildren } from '$lib/internals/index.js';

//
// ~ROOT
//
export interface TagsProps<P = any, S = any> extends Props<HTMLElement, P, S> {
	value: string[];
	disabled?: boolean;
	max?: number;
	whitelist?: string[];
	blacklist?: string[];
}

//
// ~ITEM
//
export interface TagsItemProps<P = any, S = any> extends Props<HTMLElement, P, S> {
	value: string;
}

//
// ~DELETE
//
export interface TagsDeleteProps<P = any, S = any> extends Props<HTMLButtonElement, P, S> {
	value: string;
}

//
// ~INPUT
//
export interface TagsInputProps<S = any> extends PropsNoChildren<HTMLInputElement, S> {}
