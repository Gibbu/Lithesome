import type { Attachment } from 'svelte/attachments';

type ExcludeElement = HTMLElement | string | null | undefined;

/**
 * An attachment that fires if the node is not clicked on.
 * @param callback The function called when clicking outside of the element.
 * @param exlude The element to be excluded when calling the `callback` handler.
 * @param event The event to trigger the callback function.
 *
 * Default = `click`
 */
export const outside = (
	callback: VoidFunction,
	exclude: ExcludeElement[],
	on?: keyof DocumentEventMap
): Attachment<HTMLElement> => {
	return (node) => {
		const event = (e: Event) => {
			const target = e.target as HTMLElement;
			let elements: HTMLElement[] = [];

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
			const contains = elements.some((el) => el?.contains(target));

			if (node && !node.contains(target) && !e.defaultPrevented && !contains) callback();
		};

		window.addEventListener(on || 'click', event);

		return () => {
			window.removeEventListener(on || 'click', event);
		};
	};
};
