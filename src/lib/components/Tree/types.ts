import type { Handler, Props } from '$internal';

export interface TreeState {
	/** The id of the currently selected item. */
	item: string | undefined | null;
}

export interface TreeProps extends Props<HTMLUListElement, TreeState> {
	/** The current/starting value of the tree. */
	value?: string[];
	/** Force the entire tree to be visible as the default. */
	forceVisible?: boolean;
}

export interface TreeItemState {
	/** Whether or not the item is selected or not. */
	selected: boolean;
	/** Whether or not the item is hovered, but not selected. */
	hovered: boolean;
	/** If group is visible or not. */
	active: boolean;
	/** Whether or not the item is disabled. */
	disabled: boolean;
}
export interface TreeItemProps extends Props<HTMLLIElement, TreeItemState> {
	/** The unique ID of the item. */
	id: string;
	/** Disables the item and any inner groups. */
	disabled?: boolean;
}

export interface TreeButtonEvents {
	/**
	 * Add your own custom logic to the click event.\
	 * Using the regular `onclick` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onClick?: Handler<MouseEvent, HTMLButtonElement>;
	/**
	 * Add your own custom logic to the keydown event.\
	 * Using the regular `onkeydown` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onKeydown?: Handler<KeyboardEvent, HTMLButtonElement>;
}
export interface TreeButtonProps extends Props<HTMLButtonElement, TreeItemState>, TreeButtonEvents {}

export interface TreeGroupProps extends Props<HTMLUListElement, TreeItemState> {
	/** Control the visibility of the group. */
	active?: boolean;
}
