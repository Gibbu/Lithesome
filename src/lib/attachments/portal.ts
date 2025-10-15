import { tick } from 'svelte';
import { log } from '$lib/internals/index.js';

import type { Attachment } from 'svelte/attachments';

/**
 * A svelte attachment to portal content from one part of the dom to another.
 * @param target The element to be portaled to.\
 * Default = `body`.
 */
export const portal = (target: HTMLElement | string = 'body'): Attachment<HTMLElement> => {
	return (node) => {
		const update = async (newTarget: HTMLElement | string) => {
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
