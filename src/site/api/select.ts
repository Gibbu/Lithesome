import { use, self, transition } from './_helpers.js';
import type { APIReference } from '$site/types.js';

const select: APIReference = {
	name: 'Select',
	props: [
		{
			name: 'value',
			type: 'JsonValue',
			default: '——',
			required: true,
			description: 'The selected value of the available options.'
		},
		use,
		self('Div')
	],
	childrenProps: [
		{
			name: 'visible',
			type: 'boolean',
			description: 'Whether or not the dropdown component is visible or not.'
		}
	],
	dataAttrs: [
		{
			name: 'state',
			value: `'opened' | 'closed'`,
			description: 'Whether or not the dropdown component is visible or not.'
		}
	],
	events: [
		{
			name: 'onChange',
			params: ['value: JsonValue'],
			return: 'void',
			description: `Fires any time a new option is selected.`
		}
	]
};

const trigger: APIReference = {
	name: 'SelectTrigger',
	childOf: select.name,
	props: [use, self('Div')],
	childrenProps: [
		{
			name: 'visible',
			type: 'boolean',
			description: 'Whether or not the dropdown component is visible or not.'
		}
	]
};

const dropdown: APIReference = {
	name: 'SelectDropdown',
	childOf: select.name,
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
	childrenProps: [
		{
			name: 'visible',
			type: 'boolean',
			description: 'Whether or not the dropdown component is visible or not.'
		}
	]
};

const option: APIReference = {
	name: 'SelectOption',
	childOf: dropdown.name,
	props: [
		{
			name: 'value',
			type: 'JsonValue',
			default: '——',
			required: true,
			description: 'The value of the option.'
		},
		{
			name: 'label',
			type: 'string',
			default: '——',
			description: 'The label of the option. If this is not passed, the text content of the option will be used.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables the option, disallowing clicking and keyboard navigation.'
		},
		use,
		self('Button')
	],
	childrenProps: [
		{
			name: 'hovered',
			type: 'boolean',
			description: 'Whether or not the option is currently being hovered, either by mouse or keyboard.'
		},
		{
			name: 'selected',
			type: 'boolean',
			description: 'If the option is the selected value.'
		}
	],
	dataAttrs: [
		{
			name: 'hovered',
			description: 'This is only applied if the option is hovered.'
		},
		{
			name: 'selected',
			description: 'This is only applied if the option is selected.'
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
		}
	]
};

const value: APIReference = {
	name: 'SelectValue',
	childOf: select.name,
	description: `Displays the selected value's label, or the placeholder if none is found.`,
	props: [
		{
			name: 'placeholder',
			type: 'string',
			default: 'Select an option...',
			description: 'The value to be displayed if no option is selected.'
		},
		use,
		self('Span')
	],
	dataAttrs: [
		{
			name: 'placeholder',
			description: 'Only applied if the placeholder is active.'
		}
	]
};

export default [select, trigger, dropdown, option, value];
