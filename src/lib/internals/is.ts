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
