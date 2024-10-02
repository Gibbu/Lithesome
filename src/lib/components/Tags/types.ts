import type { Handler, Props, PropsNoChildren } from '$internal';

interface TagsState {
	/** If the whole tags input is disabled. */
	disabled: boolean;
}

export interface TagsRootInternalProps {
	/** The current value of the tags. */
	value: string[];
	/** Disable the whole tags component. */
	disabled: boolean;
	/** The max number of tags allowed in the input. */
	max: number;
	/**
	 * The "allowed" list of words.\
	 * Users trying to add words that aren't on this list will be ignored.
	 */
	whitelist: string[];
	/**
	 * The denied words that cannot be added to the tags.
	 */
	blacklist: string[];
}
export interface TagsProps extends Props<HTMLDivElement, TagsState>, Partial<TagsRootInternalProps> {
	/**
	 * Lifecycle that fires whenever the `value` is changed.
	 * @param value The value at that current time.
	 */
	onChange?: (value: string[]) => void;
}

export interface TagsInputEvents {
	/**
	 * Add your own custom logic to the keydown event.\
	 * Using the regular `onkeydown` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onKeydown?: Handler<KeyboardEvent, HTMLInputElement>;
	/**
	 * Add your own custom logic to the paste event.\
	 * Using the regular `onpaste` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onPaste?: Handler<ClipboardEvent, HTMLInputElement>;
}
export interface TagsInputProps extends PropsNoChildren<HTMLInputElement, TagsState>, TagsInputEvents {}

export interface TagsDeleteEvents {
	/**
	 * Add your own custom logic to the click event.\
	 * Using the regular `onclick` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onClick?: Handler<MouseEvent, HTMLButtonElement>;
}
export interface TagsDeleteProps extends Props<HTMLButtonElement, TagsState>, TagsDeleteEvents {
	/** The value of the tag that will be removed when pressed. */
	tag: string;
}
