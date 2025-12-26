import type { Props, PropsNoChildren } from '$lib/internals/index.js';

//
// ~ROOT
//
export interface TagsProps<P = any, S = any> extends Props<HTMLElement, P, S> {
	/**
	 * The current value.
	 *
	 * ### `$bindable`
	 */
	value: string[];
	/**
	 * Disables the entire group, stops all events from firing.
	 *
	 * ### `$bindable`
	 */
	disabled?: boolean;
	/**
	 * The maximum allowed of tags.
	 */
	max?: number;
	/**
	 * Allow only these strings to be added to the `value` prop.
	 */
	whitelist?: string[];
	/**
	 * Don't allow these string to be addeed to the `value` prop.
	 */
	blacklist?: string[];
}

//
// ~ITEM
//
export interface TagsItemProps<P = any, S = any> extends Props<HTMLElement, P, S> {
	/**
	 * The value of the tag.
	 */
	value: string;
}

//
// ~DELETE
//
export interface TagsDeleteProps<P = any, S = any> extends Props<HTMLButtonElement, P, S> {
	/**
	 * The value of the item to remove.
	 */
	value: string;
}

//
// ~INPUT
//
export interface TagsInputProps<S = any> extends PropsNoChildren<HTMLInputElement, S> {}
