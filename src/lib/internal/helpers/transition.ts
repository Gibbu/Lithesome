import type { TransitionConfig } from 'svelte/transition';

export type TransitionPart = [(node: Element, config?: any) => TransitionConfig, Record<string, any>?];

export type Transition =
	| TransitionPart
	| { in: TransitionPart; out?: TransitionPart }
	| { in?: TransitionPart; out: TransitionPart };

export const getTransition = (el: Transition | null | undefined) => {
	const isBoth = Array.isArray(el);

	const parse = (type: 'in' | 'out') => {
		return el
			? isBoth
				? { transition: el[0], config: el[1] }
				: el[type]
					? { transition: el[type][0], config: el[type][1] }
					: null
			: null;
	};

	return {
		inTransition: parse('in'),
		outTransition: parse('out')
	};
};
