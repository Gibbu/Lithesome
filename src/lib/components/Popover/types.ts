import type { Props, PropsNoChildren, ContentProps, PropsNoElement } from '$internal';

/**
 * The state that is exposed from the `Popover` components.\
 * Which can be used via the `class` prop function or `children` snippet block.
 */
export interface PopoverState {
	/** Whether or not the content is opened or not. */
	visible: boolean;
}
export interface PopoverProps extends PropsNoElement<PopoverState> {
	/** Whether or not the content is opened or not. */
	visible: boolean;
}

export interface PopoverArrowProps extends PropsNoChildren<HTMLDivElement, PopoverState> {}

export interface PopoverContentProps extends Props<HTMLDivElement, PopoverState>, ContentProps {}

export interface PopoverTriggerProps extends Props<HTMLDivElement, PopoverState> {}
