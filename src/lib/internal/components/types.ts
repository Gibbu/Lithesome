import type { UID } from '../helpers/utils.svelte.js';

export interface FloatingContext {
	root: {
		uid: UID;
		content: HTMLElement | null;
		arrow: HTMLElement | null;
		trigger: HTMLElement | null;
	};
}
