import type { JsonValue, ClassProp } from '../types.js';

export type CalcIndexAction = 'prev' | 'next' | 'first' | 'last';

/**
 * Calculates the index position of the action given.
 * @param action Which direction to navigate the index.
 * @param items The items to be navigated through.
 * @param index The current index of the component state.
 * @param loop Loops around the items array if true.
 */
export const calculateIndex = <T>(
	action: CalcIndexAction,
	items: T[] | readonly T[],
	index: number,
	loop: boolean = false
) => {
	if (action === 'first') index = 0;
	if (action === 'last') index = items.length - 1;

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

export type UID = (component?: string) => string;

/**
 * Creates a unique ID to be used for accessability.
 */
export const createUID = (namespace: string) => {
	const UID_SET = 'qwertyuiopasdfghjklzxcvbnm1234567890_-';
	const uid = '123456'
		.split('')
		.map(() => UID_SET.charAt(Math.floor(38 * Math.random())))
		.join('');

	return {
		uid: (component?: string) => {
			const id = `${namespace}-${uid}`;
			return component ? `${id}-${component}` : id;
		}
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
 * Merges two objects, the first being the base config, the 2nd being the defaults
 * it will fall back to if that property isn't found.
 * @param config The base object to be parsed.
 * @param defaults The object to be initalize the object.
 */
export const defaultConfig = <const T>(config: Partial<T> | undefined, defaults: Required<T>): Required<T> => {
	return {
		...defaults,
		...config
	};
};

/**
 * @param klass The `class` component prop.
 * @param props Any state to be passed down to the function.
 */
export const classProp = <T extends Record<string, any>>(klass: ClassProp<T>, props?: T) => {
	const _props = props || ({} as T);
	const cls = $derived(typeof klass === 'function' ? klass(_props) : klass);
	return cls;
};
