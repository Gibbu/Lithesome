import { getContext, hasContext, setContext } from 'svelte';
import { log } from './log.js';

import type { Class } from '$lib/internals/index.js';

const componentName = (name: string) => `<${name.replace('Root', '')} />`;

/**
 * Setup and control context of components.
 * @param rootClass The "root" class of the context.
 */
export const buildContext = <RC>(rootClass: Class<RC>) => {
	const key = Symbol('context');

	return {
		/** Create the root context. */
		create(...rest: any[]): RC {
			const root = new rootClass(...rest);

			return setContext(key, root);
		},
		/** Get the current context. */
		get() {
			return getContext(key) as RC;
		},
		/**
		 * Creates a new class with the "root" class as the first argument.
		 * @param klass The class to apply for the context.
		 * @param rest Any props to be passed down to the class.
		 */
		register<C>(klass: Class<C>, ...rest: any[]): C {
			if (!hasContext(key))
				throw log.error(
					`${componentName(klass.name)} is not placed inside the correct context of ${componentName(rootClass.name)}`
				);

			const root = getContext(key) as RC;

			return new klass(root, ...rest);
		}
	};
};

export class Floating {
	arrow = $state<HTMLElement | null>(null);
	content = $state<HTMLElement | null>(null);
	trigger = $state<HTMLElement | null>(null);
}

/**
 * State machine to allow for dynamic two-way binding through function params.
 * @param value The current value of the state
 * @param updater The function to call when needing to update state outside of the context.
 */
export const stateValue = <T>(value: () => T, updater?: (newValue: T) => void) => {
	const val = $derived.by(value);

	return {
		get val() {
			return val;
		},
		set val(v: T) {
			updater?.(v);
		}
	};
};
