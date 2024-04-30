import type { Props } from '$lib/internal/types.js';

export interface PortalProps extends Props<HTMLDivElement> {
	/**
	 * The element to mount the children content.
	 *
	 * Default = `body`
	 */
	target?: string | HTMLElement;
}
