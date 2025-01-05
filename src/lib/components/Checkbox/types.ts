import type { Handler, Props } from '$internal';

export type Checked = boolean | 'mixed';

/**
 * The state that is exposed from the `CheckboxState` component.\
 * Which can be used via the `class` prop function or `children` snippet block.
 */
export interface CheckboxState {
	/** If the checkbox is checked or not. */
	checked: Checked;
}
export interface CheckboxProps extends Omit<Props<HTMLButtonElement, CheckboxState>, 'as'> {
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
