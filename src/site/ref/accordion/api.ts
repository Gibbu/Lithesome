import { use, self, transition } from '../helpers.js';
import type { APIReference } from '$site/types.js';

const accordion: APIReference = {
	name: 'Accordion',
	description: 'The base component that manages and controls state.',
	props: [
		{
			name: 'single',
			default: 'false',
			type: 'boolean',
			description: 'Allow only 1 <AccordionItem /> to be opened at a given time.'
		},
		use,
		self('Div')
	],
	childrenProps: [
		{
			name: 'active',
			type: 'boolean',
			description: 'Display whether any item is active.'
		}
	]
};

const item: APIReference = {
	name: 'AccordionItem',
	childOf: accordion.name,
	props: [
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables the item, disallowing it from opening.'
		},
		use,
		self('Div')
	],
	childrenProps: [
		{
			name: 'active',
			type: 'boolean',
			description: 'Display whether the item is active.'
		}
	],
	dataAttrs: [
		{
			name: 'active',
			value: 'boolean',
			description: 'Applied if any item is active.'
		}
	]
};

const heading: APIReference = {
	name: 'AccordionHeading',
	childOf: item.name,
	props: [
		{
			name: 'level',
			default: '3',
			type: '1 | 2 | 3 | 4 | 5 | 6',
			description: 'The heading level to use for the header. This will be set as the aria-level attribute.'
		},
		use,
		self('Div')
	]
};

const button: APIReference = {
	name: 'AccordionButton',
	childOf: heading.name,
	props: [use, self('Div')],
	childrenProps: [
		{
			name: 'active',
			type: 'boolean',
			description: 'Display whether the item is active.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			description: 'Disables the button if the <AccordionItem /> has the disabled prop.'
		}
	],
	dataAttrs: [
		{
			name: 'active',
			value: 'boolean',
			description: 'Applied if the current item is active.'
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

const content: APIReference = {
	name: 'AccordionContent',
	childOf: accordion.name,
	props: [use, self('Div'), transition],
	childrenProps: [
		{
			name: 'active',
			type: 'boolean',
			description: 'Display whether the item is active.'
		}
	],
	dataAttrs: [
		{
			name: 'active',
			value: 'true',
			description: 'Applied if the current item is active.'
		}
	]
};

export default [accordion, item, heading, button, content];
