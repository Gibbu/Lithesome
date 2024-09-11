import type { Handler, PropsMaybeChildren } from '$internal';

export type Checked = boolean | 'mixed';

interface CheckboxState {
	/** If the checkbox is checked or not. */
	checked: Checked;
}
export interface CheckboxProps extends PropsMaybeChildren<HTMLButtonElement, CheckboxState> {
	/** If the checkbox is checked or not. */
	checked?: Checked;
	/** Adds aria attributes. */
	required?: boolean;
	/** Disabled the checkbox, disallowing the internal events. */
	disabled?: boolean;
	/**
	 * Add your own custom logic to the click event.\
	 * Using the regular `onclick` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onClick?: Handler<MouseEvent, HTMLButtonElement>;
}
