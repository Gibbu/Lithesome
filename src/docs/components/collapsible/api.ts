import { self, use, type ComponentReference } from '$site/index.js';

const root: ComponentReference = {
	name: 'Collapsible',
	props: [
		{
			name: 'visible',
			default: 'false',
			type: 'boolean',
			description: 'Whether or not the content is visible.',
			required: true
		},
		{
			name: 'disabled',
			default: 'false',
			type: 'boolean',
			description: 'Disables the entire component tree.'
		},
		use,
		self('Div')
	],
	dataAttrs: [
		{
			name: 'disabled',
			description: 'Disables the entire component tree.',
			value: 'boolean'
		},
		{
			name: 'state',
			description: 'The current state of the content.'
		}
	],
	childrenProps: [
		{
			name: 'visible',
			type: 'boolean'
		}
	]
};

const button: ComponentReference = {
	name: 'CollapsibleButton',
	childOf: root.name,
	dataAttrs: [
		{
			name: 'disabled',
			value: 'boolean'
		}
	],
	childrenProps: [
		{
			name: 'visible',
			type: 'boolean'
		}
	]
};

const content: ComponentReference = {
	name: 'CollapsibleContent',
	childOf: root.name,
	childrenProps: [
		{
			name: 'visible',
			type: 'boolean'
		}
	]
};

export default [root, button, content];
