import { defaultProps } from './_helpers.js';
import type { APIReference } from '../types.js';

const checkbox: APIReference = {
	name: 'Checkbox',
	props: [
		{
			name: 'checked',
			type: 'boolean',
			default: 'false',
			description: 'Whether or not the checkbox is checked or not.'
		},
		{
			name: 'required',
			type: 'boolean',
			default: 'false',
			description: 'Applies the aria-required attribute.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables the checkbox, disallowing the toggling of states.'
		},
		...defaultProps('Button')
	],
	childrenProps: [
		{
			name: 'checked',
			type: 'boolean',
			description: 'Whether or not the checkbox is checked or not.'
		}
	],
	dataAttrs: [
		{
			name: 'state',
			value: `'checked' | 'unchecked'`,
			description: 'Whether or not the checkbox is checked or not.'
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

export default [checkbox];
