/**
 * Sets styles to a html element.
 * @param node The element to apply the styles to.
 * @param attrs The styles to be applied.
 */
export const setNodeStyles = <T extends HTMLElement>(node: T, attrs: { [K in keyof CSSStyleDeclaration]?: string }) => {
	Object.entries(attrs).forEach(([k, v]) => {
		node.style.setProperty(k, v!);
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
