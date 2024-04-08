import { use, self } from '../helpers.js';
import type { APIReference } from '$site/types.js';

const radiogroup: APIReference = {
	name: 'RadioGroup',
	props: [
		{
			name: 'value',
			type: 'JsonValue',
			default: '——',
			description: 'The selected value of radiogroup.',
			required: true
		},
		{
			name: 'required',
			type: 'boolean',
			default: 'false',
			description: 'Adds the aria-required attribute.'
		},
		use,
		self('Div')
	]
};

const item: APIReference = {
	name: 'RadioGroupItem',
	childOf: radiogroup.name,
	props: [
		{
			name: 'value',
			type: 'JsonValue',
			default: '——',
			description: 'The value of item.',
			required: true
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables the item, disallowing clicking and keyboard navigation.'
		}
	]
};

export default [radiogroup, item];
