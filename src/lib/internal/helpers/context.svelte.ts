import { log } from './log.js';
import { createUID, type UID } from './utils.svelte.js';
import { onDestroy, getContext, setContext, hasContext, onMount } from 'svelte';

import type { Class } from '../types.js';

const componentName = (name: string) => `<${name.replace('Root', '')} />`;

/**
 * Setup and control context of components.
 * @param rootClass The "root" class of the context.
 */
export const buildContext = <RC>(rootClass: Class<RC>) => {
	const uid = createUID('context');

	return {
		/** Create the root context. */
		createContext(...rest: any[]) {
			const root = new rootClass(...rest);

			return setContext(uid(), root);
		},
		/** Get the current context. */
		getContext() {
			return getContext(uid()) as RC;
		},
		/**
		 * Creates a new class with the "root" class as the first argument.
		 * @param klass The class to apply for the context.
		 * @param rest Any props to be passed down to the class.
		 */
		register<C>(klass: Class<C>, ...rest: any[]) {
			if (!hasContext(uid()))
				throw log.error(
					`${componentName(klass.name)} is not placed inside the correct context of ${componentName(rootClass.name)}`
				);

			const root = getContext(uid()) as RC;

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

/**
 * Auto cleanup of `$effect.root`
 */
export const useEffects = (fn: () => void) => {
	let cleanup: VoidFunction | null = null;

	onMount(() => {
		cleanup = $effect.root(fn);
	});

	const destroy = () => {
		if (cleanup === null) return;

		cleanup();
		cleanup = null;
	};

	try {
		onDestroy(destroy);
	} catch (_) {}

	return destroy;
};
