import type { Props } from '$internal';

export interface PortalProps extends Props<HTMLDivElement> {
	/**
	 * The element to mount the children content.
	 *
	 * Default = `body`
	 */
	target?: string | HTMLElement;
}
