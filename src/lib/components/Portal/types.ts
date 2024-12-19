import type { Props } from '$internal';

export interface PortalProps extends Omit<Props<HTMLDivElement>, 'as'> {
	/**
	 * The element to mount the children content.
	 *
	 * Default = `body`
	 */
	target?: string | HTMLElement;
}
