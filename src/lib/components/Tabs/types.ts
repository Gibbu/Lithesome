import type { Props, Orientation } from '$internal';

interface TabsState {
	/** The current active tab. */
	tab: string;
}
export interface TabsProps extends Props<HTMLDivElement, TabsState> {
	/** The direction of the tabs. */
	orientation?: Orientation;
	/**
	 * The default selected tab.
	 *
	 * If nothing is provided, the first tab will be selected.
	 */
	value?: string;
}

interface TabsButtonState {
	/** True if the button value is selected. */
	active: boolean;
}
export interface TabsButtonProps extends Props<HTMLButtonElement, TabsButtonState> {
	/**
	 * The unique value of the button.
	 *
	 * This *MUST* match one of the values associated  with a `TabsContent`.
	 */
	value: string;
	/** Disables the button, disallowing clicking and keyboard navigation. */
	disabled?: boolean;
}

export interface TabsContentProps extends Props<HTMLDivElement, TabsButtonState> {
	/**
	 * The unique value of the content.
	 *
	 * This *MUST* match one of the values associated  with a `TabsButton`.
	 */
	value: string;
}

export interface TabsListProps extends Props<HTMLDivElement> {}
