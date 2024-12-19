import type { Props, PropsNoChildren, Handler } from '$internal';

export type PinType = 'text' | 'password';

/**
 * The state that is exposed from the `Pin` component.\
 * Which can be used via the `class` prop function or `children` snippet block.
 */
export interface PinState {
	/** True if all inputs are filled out. */
	filled: boolean;
}
export interface PinProps extends Props<HTMLDivElement, PinState> {
	/** The resulting value of the inputs. */
	value?: string[];
	/** Disable all inputs. */
	disabled?: boolean;
	/**
	 * The input type.
	 *
	 * Use `password` to hide the characters.
	 */
	type?: 'text' | 'password';
	/** The text to be visible when not filled out or not focused. */
	placeholder?: string;
	onChange?: (value: string) => void;
	onFilled?: (value: string) => void;
}

/**
 * The state that is exposed from the `PinInput` component.\
 * Which can be used via the `class` prop function.
 */
export interface PinInputState extends PinState {
	/** If the input is disabled by the `Pin` parent component. */
	disabled: boolean;
}
export interface PinInputEvents {
	/**
	 * Add your own custom logic to the input event.\
	 * Using the regular `oninput` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onInput?: Handler<Event, HTMLInputElement>;
	/**
	 * Add your own custom logic to the keydown event.\
	 * Using the regular `onkeydown` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onKeydown?: Handler<KeyboardEvent, HTMLInputElement>;
	/**
	 * Add your own custom logic to the focus event.\
	 * Using the regular `onfocus` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onFocus?: Handler<FocusEvent, HTMLInputElement>;
	/**
	 * Add your own custom logic to the blur event.\
	 * Using the regular `onblur` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onBlur?: Handler<FocusEvent, HTMLInputElement>;
	/**
	 * Add your own custom logic to the paste event.\
	 * Using the regular `onpaste` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onPaste?: Handler<ClipboardEvent, HTMLInputElement>;
}
export interface PinInputProps extends Omit<PropsNoChildren<HTMLInputElement, PinInputState>, 'as'>, PinInputEvents {}

export interface PinValueProps extends Omit<PropsNoChildren<HTMLInputElement>, 'as'> {
	/**
	 * The HTML Input element name attribute.
	 *
	 * Used for native form submissions.
	 */
	name?: string;
}
