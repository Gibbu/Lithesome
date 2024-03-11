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
		exclude?: (HTMLElement | null | undefined)[];
	}
): { destroy: () => void } => {
	const onClick = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		const cont = options.exclude?.some((el) => el?.contains(target));

		if (node && !node.contains(target) && !e.defaultPrevented && !cont) options.callback();
	};

	document.addEventListener('click', onClick, true);

	return {
		destroy() {
			document.removeEventListener('click', onClick, true);
		}
	};
};
