import { use, self, type APIReference } from '$site/index.js';

const checkbox: APIReference = {
	name: 'Checkbox',
	props: [
		{
			name: 'checked',
			type: `boolean | 'mixed'`,
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
		use,
		self('Input')
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
