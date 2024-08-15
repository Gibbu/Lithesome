import { use, self } from '../helpers.js';
import type { APIReference } from '$site/types.js';

const tabs: APIReference = {
	name: 'Tabs',
	props: [
		{
			name: 'orientation',
			type: `'horizontal' | 'vertical'`,
			default: 'horizontal',
			description: 'The direction of the tabs. This setting will only effect how the keyboard navigation works.'
		},
		{
			name: 'value',
			type: 'string',
			default: '——',
			description: 'The selected tab.'
		},
		use,
		self('Div')
	],
	childrenProps: [
		{
			name: 'active',
			type: 'string',
			description: 'The value of the active tab.'
		}
	],
	dataAttrs: [
		{
			name: 'orientation',
			value: `'horizontal' | 'vertical'`,
			description: 'The direction of the tabs.'
		}
	]
};

const list: APIReference = {
	name: 'TabsList',
	childOf: tabs.name,
	props: [use, self('Div')],
	dataAttrs: [
		{
			name: 'orientation',
			value: `'horizontal' | 'vertical'`,
			description: 'The direction of the tabs.'
		}
	]
};

const button: APIReference = {
	name: 'TabsButton',
	childOf: list.name,
	props: [
		{
			name: 'value',
			type: 'string',
			default: '——',
			required: true,
			description: 'The unique value of the button. This must match one of the content values.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables the button, disallowing the clicking and keyboard navigation.'
		},
		use,
		self('Button')
	],
	childrenProps: [
		{
			name: 'active',
			type: 'boolean',
			description: 'Whether or not the tab is currently active.'
		}
	],
	dataAttrs: [
		{
			name: 'state',
			value: `'active' | 'inactive'`
		},
		{
			name: 'value',
			value: '——',
			description: 'The value of the button, passed through the prop.'
		}
	]
};

const content: APIReference = {
	name: 'TabsContent',
	childOf: tabs.name,
	props: [
		{
			name: 'value',
			type: 'string',
			default: '——',
			required: true,
			description: 'The unique value of the content. This must match one of the button values.'
		},
		use,
		self('Div')
	],
	dataAttrs: [
		{
			name: 'state',
			value: `'active' | 'inactive'`
		},
		{
			name: 'hidden',
			value: `'true' | 'false'`
		},
		{
			name: 'value',
			value: '——',
			description: 'The value of the button, passed through the prop.'
		},
		{
			name: 'orientation',
			value: `'horizontal' | 'vertical'`,
			description: 'The direction of the tabs.'
		}
	]
};

export default [tabs, list, button, content];
