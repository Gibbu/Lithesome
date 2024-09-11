import type { Props, PropsNoChildren, ContentProps, Handler } from '$internal';

type MenuItemElement = HTMLButtonElement | HTMLAnchorElement;

interface MenuState {
	/** Whether or not the content is opened or not. */
	visible: boolean;
}
export interface MenuProps extends Props<HTMLDivElement, MenuState> {
	/** Control the visibility of the menu */
	visible?: boolean;
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
export interface MenuItemEvents {
	/**
	 * Add your own custom logic to the click event.\
	 * Using the regular `onclick` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onClick?: Handler<MouseEvent, MenuItemElement>;
	/**
	 * Add your own custom logic to the mouseover event.\
	 * Using the regular `onmouseover` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onMouseover?: Handler<MouseEvent, MenuItemElement>;
}
export interface MenuItemProps extends Props<MenuItemElement, MenuItemState>, MenuItemEvents {
	/** Turns the button to an anchor, with the `href` passed. */
	href?: string;
	/** Disables the item, disallowing the clicking and keyboard navigation. */
	disabled?: boolean;
}

export interface MenuTriggerProps extends Props<HTMLDivElement, MenuState> {}
