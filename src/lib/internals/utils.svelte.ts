import { tick } from 'svelte';
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
 * Removes any "invalid" values from the given value.
 * @param value The value to be pruned.
 */
export const pruneValue = (value: JsonValue) => {
	if (!value) return;
	else if (typeof value === 'number' || typeof value === 'boolean') return value;
	else if (Array.isArray(value)) return value.filter(Boolean);
	else if (typeof value === 'object') return Object.entries(value).filter(Boolean);
	else return value.trim();
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
 * Transforms the string value to a number.
 *
 * Supported identifiers: `ms`, `s`
 * @param value The value to be transformed.
 */
export const parseDuration = (value: number | string): number => {
	if (typeof value === 'number') return value;
	if (!/ms|s$/.test(value)) throw log.error('`duration` prop was given a string but not a leading identifier (ms/s).');

	const duration: number = parseFloat(value.split(/ms|s/)[0]);

	if (/(?=ms)(?!s)/.test(value)) return duration;
	return duration * 1000;
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
 * Deeply searches an array
 * @param arr The array to search through
 * @param predicate The condition to meet
 */
export const deepFind = <T>(arr: T[], predicate: (item: T) => boolean): T | undefined => {
	for (const item of arr) {
		if (Array.isArray(item)) {
			const foundInNested = deepFind(item, predicate);
			if (foundInNested !== undefined) {
				return foundInNested;
			}
		} else if (predicate(item as T)) {
			return item as T;
		}
	}
	return undefined;
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
	let map = new Map<keyof HTMLElementEventMap, (e: any) => void>();

	Object.entries(events).forEach(([event, fn]) => {
		const ev = event as keyof HTMLElementEventMap;
		map.set(ev, fn);
		node.addEventListener(ev, map.get(ev) as any);
	});

	return () => {
		map.forEach((value, key) => {
			node.removeEventListener(key, value);
			map.delete(key);
		});
	};
};

/**
 * No operation function
 */
export const noop = () => {};
