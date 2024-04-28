import type { BaseProps, BasePropsNoChildren, ContentProps } from '$lib/internal/types.js';

interface PopoverState {
	/** Whether or not the content is opened or not. */
	visible: boolean;
}
export interface PopoverProps extends BaseProps<HTMLDivElement, PopoverState> {
	/** Whether or not the content is opened or not. */
	visible: boolean;
}

export interface PopoverArrowProps extends BasePropsNoChildren<HTMLDivElement, PopoverState> {}

export interface PopoverContentProps extends BaseProps<HTMLDivElement, PopoverState>, ContentProps {}

export interface PopoverTriggerProps extends BaseProps<HTMLDivElement, PopoverState> {}
