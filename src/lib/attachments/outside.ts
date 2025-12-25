import type { OutsideOptions } from '$lib/types/index.ts';
import type { Attachment } from 'svelte/attachments';

/**
 * An attachment that runs if an event is fired outside the target element.
 * @param callback The function to be called when the event fires outside of the element.
 * @param opts Optional params for the attachment.
 */
export const outside = (callback: VoidFunction, opts?: OutsideOptions): Attachment<HTMLElement> => {
	const on = opts?.on || 'click';
	const exclude = opts?.exclude;

	return (node) => {
		const event = (e: Event) => {
			const target = e.target as HTMLElement;
			let elements: HTMLElement[] = [];
			let contains: boolean = false;

			if (exclude) {
				exclude.forEach((el) => {
					if (el) {
						if (typeof el === 'string') {
							const query = Array.from(document.querySelectorAll(el)) as HTMLElement[];
							elements = [...elements, ...query];
						} else {
							elements.push(el);
						}
					}
				});
				contains = elements.some((el) => el?.contains(target));
			}

			if (node && !node.contains(target) && !e.defaultPrevented && !contains) callback();
		};

		window.addEventListener(on || 'click', event);

		return () => {
			window.removeEventListener(on || 'click', event);
		};
	};
};
