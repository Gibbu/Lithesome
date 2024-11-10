import type { APIReference, Prop } from './types.js';

type HTMLEl = 'Div' | 'Button' | 'Input' | 'Anchor' | 'Heading' | 'Paragraph' | 'Span';

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
export const self = (...el: HTMLEl[]): Prop => ({
	name: 'self',
	type: el.map((e) => `HTML${e}Element`).join(' | '),
	default: '——',
	description: 'The underlying html element that you can use to bind to.'
});

export const arrow = (component: string): APIReference => ({
	name: `${component}Arrow`,
	childOf: `${component}Content`,
	dataAttrs: [
		{
			name: 'side',
			value: `'top' | 'right' | 'bottom' | 'left'`
		}
	],
	props: [self('Div'), use]
});
