import { isBrowser } from './is.js';

/**
 * Sets attributes to a html element.
 * @param node The element to apply attributes to.
 * @param attrs The attributes to be applied.
 */
export const setNodeProps = <T extends HTMLElement>(node: T, attrs: Record<string, string>) => {
	Object.entries(attrs).forEach(([k, v]) => {
		node.setAttribute(k, v);
	});
};

/**
 * Removes attributes from a html element.
 * @param node The element to remove the attributes from.
 * @param attrs The attributes to be removed.
 */
export const removeNodeProps = <T extends HTMLElement>(node: T, ...attrs: string[]) => {
	attrs.forEach((el) => {
		node.removeAttribute(el);
	});
};

/**
 * Set styles to a html element.
 * @param node The element to apply the styles to.
 * @param styles The styles to be added.
 */
export const setNodeStyles = <T extends HTMLElement>(node: T, styles: Record<string, any>) => {
	Object.entries(styles).forEach(([k, v]) => {
		node.style.setProperty(k, v);
	});
};

/**
 * Removes styles from the html element.
 * @param node The element to remove the styles from.
 * @param styles The styles to be removed.
 */
export const removeNodeStyles = <T extends HTMLElement>(node: T, ...styles: string[]) => {
	styles.forEach((k) => {
		node.style.removeProperty(k);
	});
};

/**
 * Adds event listeners to a html element.
 * @param node The element to apply the listeners to.
 * @param listeners The listeners to be applied.
 */
export const addEventListeners = <T extends HTMLElement>(node: T, listeners: Record<string, any>) => {
	Object.entries(listeners).forEach(([k, v]) => {
		node.addEventListener(k.toString(), v);
	});
};

/**
 * Removes event listeners from a html element.
 * @param node The element to remove the listeners from.
 * @param listeners The listeners to be removed.
 */
export const removeEventListeners = <T extends HTMLElement>(node: T, listeners: Record<string, any>) => {
	Object.entries(listeners).forEach(([k, v]) => {
		node.removeEventListener(k.toString(), v);
	});
};

/**
 * Disables the browser scroll bar/functionality if any overlaying element requires focus.
 */
export const disableScroll = (state: boolean) => {
	if (isBrowser) {
		if (state) {
			document.documentElement.style.setProperty('--scrollbar-width', '0px');
			document.body.style.setProperty('overflow', 'hidden');
			document.body.style.setProperty('padding-right', '0px');
		} else {
			document.documentElement.style.removeProperty('--scrollbar-width');
			document.body.style.removeProperty('overflow');
			document.body.style.removeProperty('padding-right');
		}
	}
};

/**
 * Filters out any disabled element.
 * @param elements The array of elements
 */
export const removeDisabledElements = (query: string | HTMLElement[] | NodeListOf<Element>): HTMLElement[] => {
	if (!query || !isBrowser) return [];
	let elements: HTMLElement[] = [];

	if (query instanceof NodeList) elements = Array.from(query) as HTMLElement[];
	else if (typeof query === 'string') elements = Array.from(document.querySelectorAll(query));
	else elements = query;

	return elements.filter((element) => {
		const ariaDisabled = element.getAttribute('aria-disabled');
		const disabled = element.getAttribute('disabled');
		const dataDisabled = element.hasAttribute('data-disabled');

		return ariaDisabled === 'true' || disabled !== null || dataDisabled ? false : true;
	}) as HTMLElement[];
};
