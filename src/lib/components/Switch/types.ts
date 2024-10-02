import type { Handler, Props } from '$internal';

interface SwitchState {
	/** If the Switch is checked or not. */
	checked: boolean;
	/** If the Switch is disabled or not. */
	disabled: boolean;
}
export interface SwitchProps extends Props<HTMLButtonElement, SwitchState> {
	/** If the switch is checked or not. */
	checked?: boolean;
	/** Adds aria attributes. */
	required?: boolean;
	/** Disabled the switch, disallowing the internal events. */
	disabled?: boolean;
	/**
	 * Add your own custom logic to the click event.\
	 * Using the regular `onclick` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onClick?: Handler<MouseEvent, HTMLButtonElement>;
}
