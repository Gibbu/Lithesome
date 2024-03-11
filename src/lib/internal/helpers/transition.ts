import type { TransitionConfig } from 'svelte/transition';

export type Transition = [(node: Element, config?: any) => TransitionConfig, Record<string, any>?];

export const getTransition = (el: Transition | null | undefined) => {
	return el
		? {
				fn: el[0],
				params: el[1]
			}
		: null;
};
