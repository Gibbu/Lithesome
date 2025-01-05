import { type Handler, type Props, type PropsNoChildren } from '$internal';

/**
 * The state that is exposed from the `Tags` component.\
 * Which can be used via the `class` prop function or `children` snippet block.
 */
export interface TagsState {
	/** The currently selected tag used via keyboard navigation. */
	activeTag: boolean | undefined;
}
export interface TagsRootEvents {
	/**
	 * Add your own custom logic to the click event.\
	 * Using the regular `onclick` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onClick?: Handler<MouseEvent, HTMLElement>;
}
export interface TagsProps extends Props<HTMLElement, TagsState>, TagsRootEvents {
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

/**
 * The state that is exposed from the `TagsInput` component.\
 * Which can be used via the `class` prop function.
 */
export interface TagsInputState {
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
export interface TagsInputProps
	extends Omit<PropsNoChildren<HTMLInputElement, TagsInputState>, 'as' | 'transition'>,
		TagsInputEvents {}

/**
 * The state that is exposed from the `TagsItem` component.\
 * Which can be used via the `class` prop function or `children` snippet block.
 */
export interface TagsItemState {
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
