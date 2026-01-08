import { on } from 'svelte/events';
import { isBrowser, isObject } from './is.js';
import { log } from './log.js';

import type { JsonValue } from '$lib/internals/index.js';

export type CalcIndexAction = 'prev' | 'next' | 'first' | 'last';

/**
 * Calculates the index position of the action given.
 * @param action Which direction to navigate the index.
 * @param items The items to be navigated through.
 * @param index The current index of the component state.
 * @param loop Loops around the items array if true.
 */
export const calculateIndex = (action: CalcIndexAction, items: any[], index: number, loop: boolean = false) => {
	if (action === 'first') index = items.findIndex((el) => !el.disabled);
	if (action === 'last') index = items.findLastIndex((el) => !el.disabled);

	if (action === 'prev') {
		if (loop) index = index === -1 ? items.length - 1 : index !== 0 ? index - 1 : items.length - 1;
		else index = index === -1 ? items.length - 1 : index >= 1 ? index - 1 : index;
	}
	if (action === 'next') {
		if (loop) index = index !== items.length - 1 ? index + 1 : 0;
		else index = index !== items.length - 1 ? index + 1 : index;
	}

	return index;
};

/**
 * Transforms Svelte component IDs.
 * @param id The Svelte component ID.
 */
export const parseId = (id: string) => {
	return `lithe-${id}`;
};

/**
 * Helper function to generate data attributes and unique IDs.
 * @param prefix The component
 * @param components The components that are going to be used
 */
export const createAttributes = <const P extends string, const T extends string[]>(prefix: P, components: T) => {
	const attrs = {} as { [K in T[number]]: `data-${P}-${K}` };
	const selectors = {} as { [K in T[number]]: `[data-${P}-${K}]` };

	for (const key of components) {
		attrs[key as T[number]] = `data-${prefix}-${key}` as `data-${P}-${typeof key}`;
		selectors[key as T[number]] = `[data-${prefix}-${key}]` as `[data-${P}-${typeof key}]`;
	}

	return {
		attrs,
		selectors
	};
};

/**
 * Contructs a object with in and out properties.
 */
export const parseDelay = (delay: number | [number, number]) => {
	return {
		in: Array.isArray(delay) ? delay[0] : delay,
		out: Array.isArray(delay) ? delay[1] : delay
	};
};

/**
 * Restrict a number value between 2 values.
 * @param min The minimun value of the number.
 * @param value The value to be clamped.
 * @param max The maximum value of the number.
 */
export const clamp = (min: number, value: number, max: number) => {
	return Math.max(min, Math.min(value, max));
};

/**
 * Dead simple function that clears already existing timeout if found and sets a new one.
 */
export const trackTimeout = () => {
	let timeout = $state<ReturnType<typeof setTimeout> | null>(null);

	const clear = () => {
		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}
	};

	return {
		/**
		 * @param fn The function to run.
		 * @param delay The number in seconds to run the timeout.
		 */
		set(fn: () => void, delay: number) {
			clear();
			timeout = setTimeout(fn, delay);
		},
		/**
		 * Clear the current timeout Id.
		 */
		clear
	};
};

/**
 * Deeply merges two objects.
 * @param first The original object to be merged into
 * @param second The new object to merge into the original
 */
export const deepMerge = <T extends object, U extends object>(first: T, second: U): T & U => {
	const result = { ...first } as T & U;

	for (const [key, secondVal] of Object.entries(second)) {
		const firstVal = (first as any)[key];

		result[key as keyof (T & U)] =
			Array.isArray(secondVal) && Array.isArray(firstVal)
				? [...firstVal, ...secondVal]
				: isObject(secondVal) && isObject(firstVal)
					? deepMerge(firstVal, secondVal)
					: secondVal;
	}

	return result;
};

/**
 * Filters out any disabled element of a query/nodelist.
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

/**
 * Attaches events to a node and returns a cleanup function.
 * @param node The node to attach the events to
 * @param events The event object
 */
export const addEvents = (
	node: HTMLElement,
	events: { [K in keyof HTMLElementEventMap]?: (e: HTMLElementEventMap[K]) => void }
) => {
	let map = new Map<keyof HTMLElementEventMap, () => void>();

	Object.entries(events).forEach(([event, fn]) => {
		const ev = event as keyof HTMLElementEventMap;
		map.set(ev, on(node, event, fn as EventListener));
	});

	return () => {
		map.forEach((_, key) => {
			const cleanUp = map.get(key);
			if (cleanUp) cleanUp();
			map.delete(key);
		});
	};
};

/**
 * CSS rules to visual hide an element.
 */
export const visuallyHidden = {
	position: 'absolute',
	width: '1px',
	height: '1px',
	padding: '0',
	margin: '-1px',
	overflow: 'hidden',
	clipPath: 'inset(50%)',
	whiteSpace: 'nowrap',
	borderWidth: '0',
	userSelect: 'none',
	pointerEvents: 'none'
} as const;

/**
 * Transforms a camelCase string to a kebab-case string
 * @param property The property to convert
 */
export const camelToKebab = (property: string) => {
	return property.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
};

/**
 * Transforms a style object into a string, while converting camelCase to kebab-case.
 * @param obj The object to transform.
 */
export const styleObjectToString = (obj: Record<string, any>) => {
	return Object.entries(obj)
		.map(([p, k]) => (k ? `${camelToKebab(p)}: ${k};` : undefined))
		.join('');
};
