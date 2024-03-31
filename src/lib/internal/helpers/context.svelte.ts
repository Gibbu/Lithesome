import { createUID, type UID } from './utils.svelte.js';
import { onDestroy } from 'svelte';

export class Context<H = any> {
	uid = $state<UID>()!;
	protected hooks: H | null = null;

	constructor(name: string, hooks?: H) {
		const { uid } = createUID(name);
		this.uid = uid;
		if (hooks) this.hooks = hooks;
	}
}

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
