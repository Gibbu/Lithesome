import { use, self } from './_helpers.js';
import type { APIReference } from '$site/types.js';

const pin: APIReference = {
	name: 'Pin',
	props: [
		{
			name: 'value',
			type: 'string[]',
			default: '[]',
			description: 'The string array to bind to.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables the pin, including all the inputs.'
		},
		{
			name: 'type',
			type: `'text' | 'password'`,
			default: `'text'`,
			description: 'The display type for the inputs. Use password to hide the values.'
		},
		{
			name: 'placeholder',
			type: 'string',
			default: '○',
			description: 'The text displayed when not value or focus is present.'
		},
		use,
		self('Div')
	],
	childrenProps: [
		{
			name: 'filled',
			type: 'boolean',
			description: 'True if all inputs are filled out.'
		}
	],
	dataAttrs: [
		{
			name: 'disabled',
			value: 'true',
			description: 'Only applied disabled.'
		},
		{
			name: 'filled',
			value: 'true',
			description: 'Only applied if all inputs are filled.'
		}
	],
	events: [
		{
			name: 'onChange',
			params: ['value: string'],
			return: 'void',
			description: 'Fires on every time the value is changed.'
		},
		{
			name: 'onFilled',
			params: ['value: string'],
			return: 'void',
			description: 'Fires ohly if all inputs are filled.'
		}
	]
};

const input: APIReference = {
	name: 'PinInput',
	childOf: pin.name,
	props: [use, self('Input')],
	childrenProps: [
		{
			name: 'filled',
			type: 'boolean',
			description: 'True if all inputs are filled out.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			description: 'If the pin component is disabled or not.'
		}
	],
	dataAttrs: [
		{
			name: 'filled',
			value: 'true',
			description: 'Only applied if all inputs are filled.'
		}
	],
	events: [
		{
			name: 'onKeydown',
			params: ['e: KeyboardEvent'],
			return: 'void'
		},
		{
			name: 'onInput',
			params: ['e: Event'],
			return: 'void'
		},
		{
			name: 'onFocus',
			params: ['e: FocusEvent'],
			return: 'void'
		},
		{
			name: 'onBlur',
			params: ['e: FocusEvent'],
			return: 'void'
		},
		{
			name: 'onPaste',
			params: ['e: ClipboardEvent'],
			return: 'void'
		}
	]
};

const value: APIReference = {
	name: 'PinValue',
	childOf: pin.name,
	props: [
		{
			name: 'name',
			type: 'string',
			default: '——',
			description: 'The name of the input element, used for native form submissions.'
		},
		use,
		self('Input')
	]
};

export default [pin, input, value];
