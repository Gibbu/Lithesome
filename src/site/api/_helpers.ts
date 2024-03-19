import type { Prop } from '$site/types.js';

type HTMLEl = 'Div' | 'Button' | 'Input';

export const transition: Prop = {
	name: 'transition',
	type: 'Transition',
	default: 'undefined',
	description:
		'The svelte transition you wish to use.<br>View <a href="/docs/api#transition-prop">transition api</a> for more info.'
};
export const use: Prop = {
	name: 'use',
	type: 'Array',
	default: '[]',
	description:
		'Any svelte action to be applied to the underlying element.<br>View <a href="/docs/api#use-prop">use api</a> for more info.'
};
export const self = (el: HTMLEl): Prop => ({
	name: 'self',
	type: `HTML${el}Element`,
	default: '——',
	description: 'The underlying html element that you can use to bind to.'
});

export const defaultProps = (el: HTMLEl) => [self(el), use, transition];
