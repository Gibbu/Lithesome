import type { BaseProps, Handler, Optional } from '$lib/internal/types.js';

type Checked = boolean | 'mixed';

interface CheckboxState {
	/** If the checkbox is checked or not. */
	checked: Checked;
}
export interface CheckboxProps extends Optional<BaseProps<HTMLButtonElement, CheckboxState>, 'children'> {
	/** If the checkbox is checked or not. */
	checked?: Checked;
	/** Adds aria attributes. */
	required?: boolean;
	/** Disabled the checkbox, disallowing the internal events. */
	disabled?: boolean;
	onClick?: Handler<MouseEvent, HTMLButtonElement>;
}
