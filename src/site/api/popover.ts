import { self, use, transition } from './_helpers.js';
import type { APIReference } from '$site/types.js';

const popover: APIReference = {
	name: 'Popover',
	props: [
		{
			name: 'visible',
			type: 'boolean',
			default: 'false',
			description: 'Controlled state of the popover content.'
		},
		use,
		self('Div')
	],
	childrenProps: [
		{
			name: 'visible',
			type: 'boolean',
			description: 'Whether or not the popover content is visible or not.'
		}
	],
	dataAttrs: [
		{
			name: 'state',
			value: `'opened' | 'closed'`
		}
	]
};

const trigger: APIReference = {
	name: 'PopoverTrigger',
	childOf: popover.name,
	childrenProps: [
		{
			name: 'visible',
			type: 'boolean',
			description: 'Whether or not the popover content is visible or not.'
		}
	],
	events: [
		{
			name: 'onClick',
			params: ['e: MouseEvent'],
			return: 'void'
		},
		{
			name: 'onKeydown',
			params: ['e: KeyboardEvent'],
			return: 'void'
		}
	]
};

const content: APIReference = {
	name: 'PopoverContent',
	childOf: popover.name,
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
			default: 'body',
			description: 'The target position for the content to be mounted.'
		},
		transition,
		use,
		self('Div')
	],
	childrenProps: [
		{
			name: 'visible',
			type: 'boolean',
			description: 'Whether or not the popover content is visible or not.'
		}
	]
};

export default [popover, trigger, content];
