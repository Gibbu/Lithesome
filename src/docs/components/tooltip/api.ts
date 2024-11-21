import { self, use, transition, arrow, type ComponentReference } from '$site/index.js';

const tooltip: ComponentReference = {
	name: 'Popover',
	props: [
		{
			name: 'visible',
			type: 'boolean',
			default: 'false',
			description: 'Controlled state of the tooltip content.'
		},
		use,
		self('Div')
	],
	childrenProps: [
		{
			name: 'visible',
			type: 'boolean',
			description: 'Whether or not the tooltip content is visible or not.'
		}
	],
	dataAttrs: [
		{
			name: 'state',
			value: `'opened' | 'closed'`
		}
	]
};

const trigger: ComponentReference = {
	name: 'PopoverTrigger',
	childOf: tooltip.name,
	childrenProps: [
		{
			name: 'visible',
			type: 'boolean',
			description: 'Whether or not the tooltip content is visible or not.'
		}
	]
};

const content: ComponentReference = {
	name: 'PopoverContent',
	childOf: tooltip.name,
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
			description: 'Whether or not the tooltip content is visible or not.'
		}
	]
};

export default [tooltip, trigger, content, arrow(tooltip.name)];
