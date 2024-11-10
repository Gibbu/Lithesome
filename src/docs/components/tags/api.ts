import { use, self, type APIReference } from '$site/index.js';

export const tags: APIReference = {
	name: 'Tags',
	props: [
		{
			name: 'value',
			default: '[]',
			type: 'string[]',
			description: 'The current value of the tag input',
			required: true
		},
		{
			name: 'disabled',
			default: 'false',
			type: 'boolean',
			description: 'Disables the whole tags component(s)'
		},
		{
			name: 'max',
			default: '——',
			type: 'number',
			description: 'The max amount of tags allows at once'
		},
		{
			name: 'whitelist',
			default: '——',
			type: 'string[]',
			description: 'Only allow a set of words'
		},
		{
			name: 'blacklist',
			default: '——',
			type: 'string[]',
			description: 'Disallow a set of words'
		},
		use,
		self('Div')
	],
	events: [
		{
			name: 'onClick',
			params: ['e: MouseEvent'],
			return: 'void'
		}
	]
};

export const input: APIReference = {
	childOf: tags.name,
	name: 'TagsInput',
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
			name: 'onBlur',
			params: ['e: FocusEvent'],
			return: 'void'
		}
	]
};

export const item: APIReference = {
	childOf: tags.name,
	name: 'TagsItem',
	props: [
		{
			name: 'value',
			default: '——',
			type: 'string',
			description: 'The value of the item. This should match with the root tags value.',
			required: true
		}
	]
};

export const del: APIReference = {
	childOf: item.name,
	name: 'TagsDelete',
	props: [
		{
			name: 'value',
			default: '——',
			type: 'string',
			description: 'The value of the delete. This should match with the item.',
			required: true
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

export default [tags, input, item, del];
