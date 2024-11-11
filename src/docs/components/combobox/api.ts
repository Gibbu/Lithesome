import { use, self, transition, arrow, type ComponentReference } from '$site/index.js';

const combobox: ComponentReference = {
	name: 'Combobox',
	props: [
		{
			name: 'value',
			type: 'T',
			default: '——',
			required: true,
			description: 'The selected value of the available options.'
		},
		{
			name: 'touched',
			type: 'boolean',
			default: '——',
			description: 'True if the input has been given any input.'
		},
		{
			name: 'label',
			type: 'string',
			default: '——',
			description: 'The label of the selected value(s). This is blank if the value is set to an array.'
		},
		use,
		self('Div')
	],
	childrenProps: [
		{
			name: 'visible',
			type: 'boolean',
			description: 'Whether or not the content component is visible or not.'
		}
	],
	dataAttrs: [
		{
			name: 'state',
			value: `'opened' | 'closed'`,
			description: 'Whether or not the content component is visible or not.'
		}
	],
	events: [
		{
			name: 'onChange',
			params: ['payload: {value: string, label: string}'],
			return: 'void',
			description: `Fires any time a new option is selected.`
		}
	]
};

const input: ComponentReference = {
	name: 'ComboboxInput',
	childOf: combobox.name,
	props: [
		{
			name: 'value',
			type: 'string',
			default: '——',
			required: true,
			description: 'The value of the underlying input element.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables the input.'
		},
		use,
		self('Input')
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
			name: 'onKeydown',
			params: ['e: KeyboardEvent'],
			return: 'void'
		}
	]
};

const content: ComponentReference = {
	name: 'ConboboxContent',
	childOf: combobox.name,
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
	childrenProps: [
		{
			name: 'visible',
			type: 'boolean',
			description: 'Whether or not the content component is visible or not.'
		}
	]
};

const option: ComponentReference = {
	name: 'ComboboxOption',
	childOf: content.name,
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
			name: 'onMouseeneter',
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

export default [combobox, input, content, arrow(combobox.name), option];
