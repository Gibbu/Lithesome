import type { TransitionConfig } from 'svelte/transition';

export type TransitionPart = [(node: Element, config?: any) => TransitionConfig, Record<string, any>?];

export type Transition = TransitionPart | { in: TransitionPart; out: TransitionPart };

export const getTransition = (el: Transition | null | undefined) => {
	if (!el) return null;
	const isBoth = Array.isArray(el);
	return {
		in: {
			fn: isBoth ? el[0] : el.in![0],
			params: isBoth ? el[1] : el.in![1]
		},
		out: {
			fn: isBoth ? el[0] : el.out![0],
			params: isBoth ? el[1] : el.out![1]
		}
	};
};
