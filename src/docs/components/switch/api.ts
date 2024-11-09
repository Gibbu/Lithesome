import { use, self, type APIReference } from '$site/index.js';

const switchAPI: APIReference = {
	name: 'Switch',
	props: [
		{
			name: 'checked',
			type: 'boolean',
			default: 'false',
			description: 'Whether or not the switch is checked or not.'
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
			description: 'Disables the switch, disallowing the toggling of states.'
		},
		use,
		self('Input')
	],
	childrenProps: [
		{
			name: 'checked',
			type: 'boolean',
			description: 'Whether or not the switch is checked or not.'
		}
	],
	dataAttrs: [
		{
			name: 'state',
			value: `'checked' | 'unchecked'`,
			description: 'Whether or not the switch is checked or not.'
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

export default [switchAPI];
