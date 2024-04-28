import type { BaseProps } from '$lib/internal/types.js';

export interface PortalProps extends BaseProps<HTMLDivElement> {
	/**
	 * The element to mount the children content.
	 *
	 * Default = `body`
	 */
	target?: string | HTMLElement;
}
