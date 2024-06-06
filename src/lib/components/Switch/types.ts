import type { Handler, PropsMaybeChildren } from '$internal';

interface SwitchState {
	/** If the Switch is checked or not. */
	checked: boolean;
	/** If the Switch is disabled or not. */
	disabled: boolean;
}
export interface SwitchProps extends PropsMaybeChildren<HTMLButtonElement, SwitchState> {
	/** If the switch is checked or not. */
	checked?: boolean;
	/** Adds aria attributes. */
	required?: boolean;
	/** Disabled the switch, disallowing the internal events. */
	disabled?: boolean;
	onClick?: Handler<MouseEvent, HTMLButtonElement>;
}
