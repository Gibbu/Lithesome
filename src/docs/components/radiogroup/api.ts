import { use, self, type ComponentReference } from '$site/index.js';

const radiogroup: ComponentReference = {
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

const item: ComponentReference = {
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
