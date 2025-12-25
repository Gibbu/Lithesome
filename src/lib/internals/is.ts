import type { Component } from 'svelte';

/**
 * Checks if the given runtime is the browser.
 */
export const isBrowser = typeof window !== 'undefined';

/**
 * Checks if the value is a valid function
 * @param value The value to check
 */
export const isFunction = (value: unknown): value is (...args: unknown[]) => unknown => {
	return typeof value === 'function';
};

/**
 * Checks if the value is an object.
 * @param val The value to check
 */
export const isObject = (val: unknown): val is Record<string, unknown> => {
	return typeof val === 'object' && val !== null && !Array.isArray(val);
};

/**
 * Checks if the value given is a Svelte component.
 * @param value The value to check
 */
export const isComponent = <T extends Record<string, any> = Record<string, any>>(x: unknown): x is Component<T> => {
	return typeof x === 'function' && x.prototype !== undefined && typeof (x as any).prototype.$$render === 'function';
};

/**
 * Checks if the given value is a Svelte snippet.
 * @param value The value to check
 */
export const isSnippet = <P extends unknown[] = []>(x: unknown): x is (...args: P) => any => {
	return typeof x === 'function' && !isComponent(x);
};
