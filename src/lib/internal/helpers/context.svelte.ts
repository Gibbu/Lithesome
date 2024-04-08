import { createUID, type UID } from './utils.svelte.js';
import { onDestroy, getContext } from 'svelte';

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

/**
 * Helper function to create a svelte context with a
 * unique name to avoid naming collisions.
 * @param name The name of the context
 * @returns
 */
export const setupContext = <T>(name: string) => {
	let { uid } = createUID(name + 'Context');
	return {
		contextName: uid(),
		context: () => getContext<T>(uid())
	};
};

/**
 * Auto cleanup effects when the component is unmounted from the DOM.
 */
export const effects = (fn: () => void) => {
	let cleanUp: (() => void) | null = $effect.root(fn);

	const destroy = () => {
		if (cleanUp === null) return;
		cleanUp();
		cleanUp = null;
	};

	onDestroy(destroy);

	return destroy;
};
