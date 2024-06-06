import type { Props, PropsNoChildren, Handler } from '$internal';

interface PinState {
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

interface PinInputState extends PinState {
	/** If the input is disabled by the `Pin` parent component. */
	disabled: boolean;
}
export interface PinInputProps extends PropsNoChildren<HTMLInputElement, PinInputState> {
	onKeydown?: Handler<KeyboardEvent, HTMLInputElement>;
	onInput?: Handler<Event, HTMLInputElement>;
	onFocus?: Handler<FocusEvent, HTMLInputElement>;
	onBlur?: Handler<FocusEvent, HTMLInputElement>;
	onPaste?: Handler<ClipboardEvent, HTMLInputElement>;
}

export interface PinValueProps extends PropsNoChildren<HTMLInputElement> {
	/**
	 * The HTML Input element name attribute.
	 *
	 * Used for native form submissions.
	 */
	name?: string;
}
