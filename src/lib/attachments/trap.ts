import { createFocusTrap } from 'focus-trap';

import type { FocusTrap, Options } from 'focus-trap';
import type { Attachment } from 'svelte/attachments';

/**
 * Creates a focus trap.
 */
export const trap = (opts: Options): Attachment<HTMLElement> => {
	return (node) => {
		let trap: FocusTrap | null = null;
		if (trap) return;

		trap = createFocusTrap(node, {
			fallbackFocus: node,
			...opts
		});
		trap.activate();

		return () => {
			trap?.deactivate();
			trap = null;
		};
	};
};
