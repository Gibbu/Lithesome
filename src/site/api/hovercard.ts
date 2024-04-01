import { use, self, transition } from './_helpers.js';
import type { APIReference } from '$site/types.js';

const hovercard: APIReference = {
	name: 'Hovercard',
	props: [
		{
			name: 'visible',
			type: 'boolean',
			default: 'false',
			description: 'Whether or not the content is visible or not.'
		},
		{
			name: 'delay',
			type: 'number | [number, number]',
			default: '700',
			description: 'The delay between the the content being visible or not.'
		},
		self('Div'),
		use
	],
	dataAttrs: [
		{
			name: 'state',
			value: `'opened' | 'closed'`,
			description: 'Whether or not the content is visible or not.'
		}
	],
	childrenProps: [
		{
			name: 'visible',
			type: 'boolean',
			description: 'Whether or not the content is visible or not.'
		}
	]
};

const trigger: APIReference = {
	name: 'HovercardTrigger',
	childOf: hovercard.name,
	props: [self('Div'), use],
	childrenProps: [
		{
			name: 'visible',
			type: 'boolean',
			description: 'Whether or not the content is visible or not.'
		}
	]
};

const content: APIReference = {
	name: 'HovercardContent',
	childOf: hovercard.name,
	props: [
		{
			name: 'placement',
			type: 'Placement',
			default: 'bottom',
			description: 'The FloatingUI placement string.'
		},
		{
			name: 'constrainViewport',
			type: 'boolean',
			default: 'false',
			description: 'Keeps the dropdown from ever growing outside of the viewport.'
		},
		{
			name: 'sameWidth',
			type: 'boolean',
			default: 'false',
			description: 'Makes the dropdown the same width as the trigger.'
		},
		{
			name: 'portalTarget',
			type: 'strng | HTMLElement',
			default: `'body'`,
			description: 'The target position for the dropdown to be mounted.'
		},
		use,
		self('Div'),
		transition
	],
	dataAttrs: [
		{
			name: 'side',
			value: `'top' | 'right' | 'bottom' | 'left'`,
			description: 'The position of the dropdown relative to the trigger.'
		},
		{
			name: 'alignment',
			value: `'start' | 'center' | 'end'`,
			description: 'The alignment of dropdown relative to the trigger.'
		}
	],
	events: [
		{
			name: 'onMouseenter',
			params: ['e: MouseEnter'],
			return: 'void'
		},
		{
			name: 'onMouseleave',
			params: ['e: MouseEnter'],
			return: 'void'
		}
	]
};

export default [hovercard, trigger, content];
