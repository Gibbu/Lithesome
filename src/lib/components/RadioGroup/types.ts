import type { Props } from '$internal';

export interface RadioGroupProps extends Props<HTMLDivElement> {
	/** The value of the radiogroup. */
	value?: string;
	/** Set aria attributes. */
	required?: boolean;
	onChange?: (value: string) => void;
}

interface RadioGroupItemState {
	/** True if the item is selected. */
	checked: boolean;
}
export interface RadioGroupItemProps extends Props<HTMLButtonElement, RadioGroupItemState> {
	/** The value of the individual item. */
	value: string;
	/** Disable the item, disallowing clicking and keyboard navigation. */
	disabled?: boolean;
}
