import type { Props, PropsNoChildren, ContentProps, Handler } from '$internal';

type MenuItemElement = HTMLButtonElement | HTMLAnchorElement;

interface MenuState {
	/** Whether or not the content is opened or not. */
	visible: boolean;
}
export interface MenuProps extends Props<HTMLDivElement, MenuState> {
	/**
	 * The delay between the the content being visible or not.
	 *
	 * Passing an array will allow you to change the delays for in and out.
	 */
	delay?: number | [number, number];
}

export interface MenuArrowProps extends PropsNoChildren<HTMLDivElement, MenuState> {}

export interface MenuContentProps extends Props<HTMLDivElement, MenuState>, ContentProps {}

interface MenuItemState {
	/** True if the option is hovered, via mouse or keyboard navigation. */
	hovered: boolean;
}
export interface MenuItemProps extends Props<MenuItemElement, MenuItemState> {
	/** Turns the button to an anchor, with the `href` passed. */
	href?: string;
	/** Disables the item, disallowing the clicking and keyboard navigation. */
	disabled?: boolean;
	onClick?: Handler<MouseEvent, MenuItemElement>;
	onMouseover?: Handler<MouseEvent, MenuItemElement>;
	onFocus?: Handler<FocusEvent, MenuItemElement>;
}

export interface MenuTriggerProps extends Props<HTMLDivElement, MenuState> {}
