type ExlcudeElement = HTMLElement | null | undefined;

/**
 * @param node Element to hide when clicking outside.
 * This element is parsed automatically.
 * @param options Object of options.
 * @param options.callback The function called when clicking outside of the element.
 * @param options.exlude The element to be excluded when calling the `options.callback` handler.
 */
export const clickOutside = (
	node: HTMLElement,
	options: {
		callback: () => void;
		exclude?: ExlcudeElement[] | ExlcudeElement;
	}
): { destroy: () => void } => {
	const onClick = (e: MouseEvent) => {
		const { callback, exclude } = options;
		const target = e.target as HTMLElement;
		const contains = Array.isArray(exclude) ? exclude.some((el) => el?.contains(target)) : exclude?.contains(target);

		if (node && !node.contains(target) && !e.defaultPrevented && !contains) callback();
	};

	document.addEventListener('click', onClick, true);

	return {
		destroy() {
			document.removeEventListener('click', onClick, true);
		}
	};
};
