export const setNodeProps = <T extends HTMLElement>(node: T, attrs: Record<string, string>) => {
	Object.entries(attrs).forEach(([k, v]) => {
		node.setAttribute(k, v);
	});
};

export const removeNodeProps = <T extends HTMLElement>(node: T, ...attrs: string[]) => {
	attrs.forEach((el) => {
		node.removeAttribute(el);
	});
};

export const addEventListeners = <T extends HTMLElement>(
	node: T,
	listeners: Record<string, any>
) => {
	Object.entries(listeners).forEach(([k, v]) => {
		node.addEventListener(k.toString(), v);
	});
};
export const removeEventListeners = <T extends HTMLElement>(
	node: T,
	listeners: Record<string, any>
) => {
	Object.entries(listeners).forEach(([k, v]) => {
		node.removeEventListener(k.toString(), v);
	});
};

export const getElementPosition = <T extends HTMLElement>(node: T) => {
	const { x, y, height, width } = node.getBoundingClientRect();
	return {
		top: y + scrollY + height,
		left: x,
		width
	};
};
