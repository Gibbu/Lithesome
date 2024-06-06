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
	onClick?: Handler<MouseEvent, HTMLButtonElement>;
}
