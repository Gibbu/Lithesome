import type { Props, PropsNoChildren, ContentProps } from '$internal';

interface PopoverState {
	/** Whether or not the content is opened or not. */
	visible: boolean;
}
export interface PopoverProps extends Props<HTMLDivElement, PopoverState> {
	/** Whether or not the content is opened or not. */
	visible: boolean;
}

export interface PopoverArrowProps extends PropsNoChildren<HTMLDivElement, PopoverState> {}

export interface PopoverContentProps extends Props<HTMLDivElement, PopoverState>, ContentProps {}

export interface PopoverTriggerProps extends Props<HTMLDivElement, PopoverState> {}
