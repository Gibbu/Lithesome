import { use, self, type ComponentReference } from '$site/index.js';

const toaster: ComponentReference = {
	name: 'Toaster',
	props: [use, self('Div')],
	childrenProps: [
		{
			name: '_',
			type: 'Toast[]',
			description: 'The available toasts.'
		}
	]
};

const toast: ComponentReference = {
	name: 'Toast',
	props: [use, self('Div')],
	childOf: toaster.name
};

const title: ComponentReference = {
	name: 'ToastTitle',
	props: [use, self('Heading')],
	childOf: toast.name
};

const message: ComponentReference = {
	name: 'ToastMessage',
	props: [use, self('Paragraph')],
	childOf: toast.name
};

const toasterFn: ComponentReference = {
	name: 'toaster',
	description: 'The methods to add/remove toasts from the toaster.',
	function: true,
	events: [
		{
			name: 'add',
			params: ['type', 'config'],
			return: 'void',
			description: 'Add a toast to the toaster.'
		},
		{
			name: 'removeById',
			params: ['toastId: string'],
			return: 'void',
			description: 'Remove a toast by its unique ID.'
		}
	]
};

export default [toaster, toast, title, message, toasterFn];
