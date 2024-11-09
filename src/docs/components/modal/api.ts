import { transition, use, self, type APIReference } from '$site/index.js';

const modal: APIReference = {
	name: 'Modal',
	props: [
		{
			name: 'visible',
			type: 'boolean',
			default: 'false',
			required: true,
			description: ''
		},
		{
			name: 'portalTarget',
			type: `string | HTMLElement`,
			default: `'body'`,
			description: 'The target element to mount the modal.'
		},
		use,
		self('Div')
	]
};

const overlay: APIReference = {
	name: 'ModalOverlay',
	childOf: modal.name,
	props: [transition, use, self('Div')]
};

const content: APIReference = {
	name: 'ModalContent',
	childOf: modal.name,
	props: [transition, use, self('Div')]
};

const title: APIReference = {
	name: 'ModalTitle',
	childOf: content.name,
	props: [use, self('Heading')]
};

const description: APIReference = {
	name: 'ModalDescription',
	childOf: content.name,
	props: [use, self('Paragraph')]
};

export default [modal, overlay, content, title, description];
