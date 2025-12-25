import { tick } from 'svelte';
import { log } from '$lib/internals/index.js';

import type { PortalTarget } from '$lib/types/index.js';
import type { Attachment } from 'svelte/attachments';

/**
 * An attachment that mounts the element to a different location in the DOM.
 * @param target The element to mount the content to.\
 * Default = `body`.
 */
export const portal = (target: PortalTarget = 'body'): Attachment<HTMLElement> => {
	return (node) => {
		const update = async (newTarget: PortalTarget) => {
			let el: HTMLElement | null = typeof newTarget === 'string' ? document.querySelector(newTarget) : newTarget;

			await tick();

			if (!el) {
				log.error(`Cannot find the given target element: ${target}`);
				return;
			}

			el.appendChild(node);
		};

		update(target);

		return () => {
			tick().then(() => {
				if (node) node.remove();
			});
		};
	};
};
