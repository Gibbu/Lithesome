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

export const addEventListeners = <T extends HTMLElement>(node: T, listeners: Record<string, any>) => {
	Object.entries(listeners).forEach(([k, v]) => {
		node.addEventListener(k.toString(), v);
	});
};
export const removeEventListeners = <T extends HTMLElement>(node: T, listeners: Record<string, any>) => {
	Object.entries(listeners).forEach(([k, v]) => {
		node.removeEventListener(k.toString(), v);
	});
};

export const disableScroll = (state: boolean) => {
	if (typeof window !== 'undefined') {
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
