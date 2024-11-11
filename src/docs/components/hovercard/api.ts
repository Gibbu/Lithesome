import { use, self, transition, arrow, type ComponentReference } from '$site/index.js';

const hovercard: ComponentReference = {
	name: 'Hovercard',
	props: [
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

const trigger: ComponentReference = {
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

const content: ComponentReference = {
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
			description: 'Keeps the content dropdown from ever growing outside of the viewport.'
		},
		{
			name: 'sameWidth',
			type: 'boolean',
			default: 'false',
			description: 'Makes the content dropdown the same width as the trigger.'
		},
		{
			name: 'portalTarget',
			type: 'strng | HTMLElement',
			default: `'body'`,
			description: 'The target position for the content dropdown to be mounted.'
		},
		use,
		self('Div'),
		transition
	],
	dataAttrs: [
		{
			name: 'side',
			value: `'top' | 'right' | 'bottom' | 'left'`,
			description: 'The position of the content dropdown relative to the trigger.'
		},
		{
			name: 'alignment',
			value: `'start' | 'center' | 'end'`,
			description: 'The alignment of content dropdown relative to the trigger.'
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

export default [hovercard, trigger, content, arrow(hovercard.name)];
