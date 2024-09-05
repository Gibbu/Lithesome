import type { UID } from '../helpers/utils.svelte.js';

export interface FloatingContext {
	root: {
		uid: UID;
		content: HTMLElement | null;
		arrow: HTMLElement | null;
		trigger: HTMLElement | null;
	};

	state?: Record<string, any>;
	attrs?: Record<string, any>;
}
