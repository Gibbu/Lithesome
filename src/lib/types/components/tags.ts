import type { Props, PropsNoChildren } from '$lib/internals/index.js';

//
// ~ROOT
//
export interface TagsProps<P = any> extends Props<HTMLElement, P, TagsState> {
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
export interface TagsState {
	/**
	 * The value if the selected tag via keyboard navigation.
	 */
	activeTag: string | null;
	/**
	 * True if:
	 * - Input value is less than 1.
	 * - Tag already exists.
	 * - Tag isn't in the whitelist.
	 * - Tag isn't allowed by the blacklist.
	 */
	invalid: boolean;
}

//
// ~INPUT
//
export interface TagsInputProps extends PropsNoChildren<HTMLInputElement, TagsInputState> {}
export interface TagsInputState {
	/**
	 * True if:
	 * - Input value length is less than 1.
	 * - Tag already exists.
	 * - Tag isn't in the whitelist.
	 * - Tag isn't allowed by the blacklist.
	 */
	invalid: boolean;
}

//
// ~ITEM
//
export interface TagsItemProps<P = any> extends Props<HTMLElement, P, TagsItemState> {
	/**
	 * The value of the tag.
	 */
	value: string;
}
export interface TagsItemState {
	/**
	 * True if selected via keyboard navigation.
	 */
	active: boolean;
}

//
// ~DELETE
//
export interface TagsDeleteProps<P = any> extends Props<HTMLButtonElement, P, any> {
	/**
	 * The value of the item to remove.
	 */
	value: string;
}
