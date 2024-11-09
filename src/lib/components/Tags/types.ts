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
	disabled?: boolean;
	/** The max amount of tags allows at once. */
	max?: number;
	/**
	 * Only allow a set of words.\
	 * This will also allow the use of `TagsList` which will display the full set of words.
	 */
	whitelist?: string[];
	/** Disallow a set of words. */
	blacklist?: string[];
	/** Allows the edits of already submitted tags. */
	editable?: boolean;
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
}
export interface TagsInputProps extends PropsNoChildren<HTMLInputElement, TagsInputState>, TagsInputEvents {}

interface TagsItemState {
	active: boolean;
}
export interface TagsItemEvents {
	/**
	 * Add your own custom logic to the ondblclick event.\
	 * Using the regular `onondblclick` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onDblclick?: Handler<MouseEvent, HTMLElement>;
	/**
	 * Add your own custom logic to the keydown event.\
	 * Using the regular `onkeydown` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onKeydown?: Handler<KeyboardEvent, HTMLElement>;
	/**
	 * Add your own custom logic to the blur event.\
	 * Using the regular `onblur` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onBlur?: Handler<FocusEvent, HTMLElement>;
}
export interface TagsItemProps extends Props<HTMLElement, TagsItemState>, TagsItemEvents {
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
