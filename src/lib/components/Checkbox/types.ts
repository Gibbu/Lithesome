import type { Handler, Props, PropsNoElement } from '$internal';

export type Checked = boolean | 'mixed';

export interface CheckboxState {
	/** If the checkbox is checked or not. */
	checked: Checked;
	/** Whether or not the checkbox is disabled. */
	disabled: boolean;
}

export interface CheckboxProps extends PropsNoElement<CheckboxState> {
	/** If the checkbox is checked or not. */
	checked?: Checked;
	/** Adds aria attributes. */
	required?: boolean;
	/** Disabled the checkbox, disallowing the internal events. */
	disabled?: boolean;
}

export interface CheckboxButtonEvents {
	/**
	 * Add your own custom logic to the click event.\
	 * Using the regular `onclick` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onClick?: Handler<MouseEvent, HTMLButtonElement>;
}
export interface CheckboxButtonProps extends Props<HTMLButtonElement, CheckboxState>, CheckboxButtonEvents {}

export interface CheckboxLabelProps extends Props<HTMLLabelElement, CheckboxState> {}
