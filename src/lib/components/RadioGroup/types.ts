import type { Props, Handler, JsonValue } from '$internal';

export interface RadioGroupProps extends Props<HTMLDivElement> {
	/** The value of the radiogroup. */
	value: JsonValue;
	/** Set aria attributes. */
	required?: boolean;
}

interface RadioGroupItemState {
	/** True if the item is selected. */
	checked: boolean;
}
export interface RadioGroupItemProps extends Props<HTMLButtonElement, RadioGroupItemState> {
	/** The value of the individual item. */
	value: JsonValue;
	/** Disable the item, disallowing clicking and keyboard navigation. */
	disabled?: boolean;
	onClick?: Handler<MouseEvent, HTMLButtonElement>;
	onKeydown?: Handler<KeyboardEvent, HTMLButtonElement>;
}
