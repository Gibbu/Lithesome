import { createUID, type UID } from './utils.svelte.js';
import { onDestroy, getContext, onMount } from 'svelte';

export class Context<H = any, T extends HTMLElement = any> {
	public uid = $state<UID>()!;
	public arrow = $state<HTMLElement | null>(null);
	public content = $state<HTMLElement | null>(null);
	public trigger = $state<T | null>(null);
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

	onMount(() => {
		cleanUp = $effect.root(fn);
	});
	onDestroy(destroy);

	return destroy;
};
