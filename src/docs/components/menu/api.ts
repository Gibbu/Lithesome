import { self, use, transition, arrow, type ComponentReference } from '$site/index.js';

const menu: ComponentReference = {
	name: 'Menu',
	description: 'The base component that manages and controls state.',
	props: [use, self('Div')],
	childrenProps: [
		{
			name: 'visible',
			type: 'boolean',
			description: 'Whether the content component is visible.'
		}
	],
	dataAttrs: [
		{
			name: 'state',
			value: `'opened' | 'closed'`,
			description: 'Whether the content component is visible.'
		}
	]
};

const trigger: ComponentReference = {
	name: 'MenuTrigger',
	childOf: menu.name,
	description: 'The component wrapper for the menu trigger.',
	props: [use, self('Div')],
	childrenProps: [
		{
			name: 'visible',
			type: 'boolean',
			description: 'Whether the content component is visible.'
		}
	],
	events: [
		{
			name: 'onClick',
			params: ['e: MouseEvent'],
			return: 'void'
		}
	]
};

const content: ComponentReference = {
	name: 'MenuContent',
	childOf: menu.name,
	childrenProps: [
		{
			name: 'visible',
			type: 'boolean',
			description: 'Whether the content component is visible.'
		}
	],
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
			description: 'Keeps the content from ever growing outside of the viewport.'
		},
		{
			name: 'sameWidth',
			type: 'boolean',
			default: 'false',
			description: 'Makes the content the same width as the trigger.'
		},
		{
			name: 'portalTarget',
			type: 'strng | HTMLElement',
			default: `'body'`,
			description: 'The target position for the content to be mounted.'
		},
		use,
		self('Div'),
		transition
	],
	dataAttrs: [
		{
			name: 'side',
			value: `'top' | 'right' | 'bottom' | 'left'`,
			description: 'The position of the content relative to the trigger.'
		},
		{
			name: 'alignment',
			value: `'start' | 'center' | 'end'`,
			description: 'The alignment of content relative to the trigger.'
		}
	]
};

const item: ComponentReference = {
	name: 'MenuItem',
	childOf: content.name,
	childrenProps: [
		{
			name: 'hovered',
			type: 'boolean',
			description: 'If the item is currently being hovered via mouse or keyboard navigation.'
		}
	],
	dataAttrs: [
		{
			name: 'hovered',
			value: 'true',
			description: 'If the item is currently being hovered via mouse or keyboard navigation.'
		}
	],
	events: [
		{
			name: 'onClick',
			params: ['e: MouseEvent'],
			return: 'void'
		},
		{
			name: 'onFocus',
			params: ['e: FocusEvent'],
			return: 'void'
		},
		{
			name: 'onMouseover',
			params: ['e: MouseEvent'],
			return: 'void'
		}
	],
	props: [
		{
			name: 'href',
			type: 'string | undefined',
			default: 'undefined',
			description: 'Switches the item to an anchor tag with the target href.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables the item. Disallowing clicking and navigation via mouse or keyboard.'
		},
		self('Button', 'Anchor'),
		use
	]
};

export default [menu, trigger, content, arrow(menu.name), item];
