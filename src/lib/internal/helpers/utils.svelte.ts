import { log } from './log.js';
import type { JsonValue, ClassProp } from '../types.js';

export type CalcIndexAction = 'prev' | 'next' | 'first' | 'last';
export type UID = (component?: string) => string;

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
 * Creates a unique ID to be used for accessability.
 */
export const createUID = (namespace: string) => {
	const UID_SET = 'qwertyuiopasdfghjklzxcvbnm1234567890_-';

	let uid: string = '';

	for (let i = 0; i < 5; i++) {
		uid += UID_SET.charAt(Math.floor(UID_SET.length * Math.random()));
	}

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
 * Convers an object to a string.
 * @param obj The object to be converted to a string
 */
export const styleObjToString = (obj: Record<string, any>) => {
	const css = $derived(
		Object.entries(obj)
			.filter(Boolean)
			.map(([key, value]) => `${key}: ${value}`)
			.join(';')
	);

	return css;
};
