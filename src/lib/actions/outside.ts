type ExlcudeElement = HTMLElement | null | undefined;

/**
 * @param node Element to hide when clicking outside.
 * This element is parsed automatically.
 * @param options Object of options.
 * @param options.callback The function called when clicking outside of the element.
 * @param options.exlude The element to be excluded when calling the `options.callback` handler.
 * @param options.event The event to trigger the callback function.
 *
 * Default = `click`
 */
export const useOutside = (
	node: HTMLElement,
	options: {
		callback: () => void;
		exclude?: ExlcudeElement[] | ExlcudeElement;
		on?: keyof DocumentEventMap;
	}
): { destroy: () => void } => {
	const { callback, exclude, on = 'click' } = options;

	const event = (e: Event) => {
		const target = e.target as HTMLElement;
		const contains = Array.isArray(exclude) ? exclude.some((el) => el?.contains(target)) : exclude?.contains(target);

		if (node && !node.contains(target) && !e.defaultPrevented && !contains) callback();
	};

	document.addEventListener(on, event, true);

	return {
		destroy() {
			document.removeEventListener(on, event, true);
		}
	};
};
