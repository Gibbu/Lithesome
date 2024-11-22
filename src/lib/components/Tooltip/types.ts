import type { Props, PropsNoChildren, PropsNoElement, ContentProps } from '$internal';

/**
 * The state that is exposed from the `Tooltip` components.\
 * Which can be used via the `class` prop function or `children` snippet block.
 */
export interface TooltipState {
	/** Whether or not the content is opened or not. */
	visible: boolean;
}
export interface TooltipProps extends PropsNoElement<TooltipState> {
	/** Whether or not the content is opened or not. */
	visible?: boolean;
	/** Disables the entire Tooltip component tree. */
	disabled?: boolean;
	/**
	 * The delay between the the content being visible or not.
	 *
	 * Passing an array will allow you to change the delays for in and out.
	 */
	delay?: number | [number, number];
}

export interface TooltipArrowProps extends PropsNoChildren<HTMLDivElement, TooltipState> {}

export interface TooltipContentProps extends Props<HTMLDivElement, TooltipState>, ContentProps {}

export interface TooltipTriggerProps extends Props<HTMLDivElement, TooltipState> {}
