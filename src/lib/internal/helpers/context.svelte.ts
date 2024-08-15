import { log } from './log.js';
import { createUID, type UID } from './utils.svelte.js';
import { onDestroy, getContext, setContext, hasContext } from 'svelte';

import type { Class } from '../types.js';

const componentName = (name: string) => `<${name.replace('State', '')} />`;

export const buildContext = <RC>(rootClass: Class<RC>) => {
	const { uid } = createUID('context');

	return {
		createContext(...rest: any[]) {
			const root = new rootClass(...rest);

			return setContext(uid(), root);
		},
		getContext() {
			return getContext(uid()) as RC;
		},
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

// TODO: Remove below after rewrite.

export class Context<H = any> {
	public uid = $state<UID>()!;
	protected hooks: H | null = null;
	protected _mounted = $state<boolean>(false);

	constructor(name: string, hooks?: H) {
		const { uid } = createUID(name);
		this.uid = uid;
		if (hooks) this.hooks = hooks;
	}

	readonly #onMount = effects(() => {
		$effect(() => {
			this._mounted = true;
		});
	});
}

export class FloatingContext<H = any, T extends HTMLElement = any> extends Context<H> {
	public arrow = $state<HTMLElement | null>(null);
	public content = $state<HTMLElement | null>(null);
	public trigger = $state<T | null>(null);
	constructor(name: string, hooks?: H) {
		super(name, hooks);
	}
}

/**
 * Helper function to create a svelte context with a unique name to avoid naming collisions.
 * @param name The name of the context
 */
export const setupContext = <T>() => {
	let { uid } = createUID('context');
	return {
		contextName: uid(),
		context: () => getContext<T>(uid())
	};
};

/**
 * Auto cleanup effects when the component is unmounted from the DOM.
 */
export const effects = (fn: () => void) => {
	let cleanUp: (() => void) | null = null;

	const destroy = () => {
		if (cleanUp === null) return;
		cleanUp();
		cleanUp = null;
	};

	try {
		cleanUp = $effect.root(fn);
	} catch (error) {}

	onDestroy(destroy);

	return destroy;
};
