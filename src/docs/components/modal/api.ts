import { transition, use, self, type ComponentReference } from '$site/index.js';

const modal: ComponentReference = {
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

const overlay: ComponentReference = {
	name: 'ModalOverlay',
	childOf: modal.name,
	props: [transition, use, self('Div')]
};

const content: ComponentReference = {
	name: 'ModalContent',
	childOf: modal.name,
	props: [transition, use, self('Div')]
};

const title: ComponentReference = {
	name: 'ModalTitle',
	childOf: content.name,
	props: [use, self('Heading')]
};

const description: ComponentReference = {
	name: 'ModalDescription',
	childOf: content.name,
	props: [use, self('Paragraph')]
};

export default [modal, overlay, content, title, description];
