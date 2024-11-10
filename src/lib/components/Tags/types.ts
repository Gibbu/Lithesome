import { type Handler, type Props, type PropsNoChildren } from '$internal';

export interface TagsRootEvents {
	/**
	 * Add your own custom logic to the click event.\
	 * Using the regular `onclick` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onClick?: Handler<MouseEvent, HTMLElement>;
}
export interface TagsProps extends Props<HTMLElement>, TagsRootEvents {
	/** The current value of the tag input */
	value: string[];
	/** Disables the whole tags component(s). */
	disabled?: boolean;
	/** The max amount of tags allows at once. */
	max?: number;
	/** Only allow a set of words. */
	whitelist?: string[];
	/** Disallow a set of words. */
	blacklist?: string[];
}

interface TagsInputState {
	invalid: boolean;
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
	 * Add your own custom logic to the input event.\
	 * Using the regular `oninput` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onInput?: Handler<Event, HTMLInputElement>;
	/**
	 * Add your own custom logic to the blur event.\
	 * Using the regular `onblur` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onBlur?: Handler<FocusEvent, HTMLInputElement>;
}
export interface TagsInputProps extends PropsNoChildren<HTMLInputElement, TagsInputState>, TagsInputEvents {}

interface TagsItemState {
	active: boolean;
}
export interface TagsItemProps extends Props<HTMLElement, TagsItemState> {
	value: string;
}

export interface TagsDeleteEvents {
	/**
	 * Add your own custom logic to the click event.\
	 * Using the regular `onclick` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onClick?: Handler<MouseEvent, HTMLButtonElement>;
}
export interface TagsDeleteProps extends Props<HTMLButtonElement>, TagsDeleteEvents {
	value: string;
}
