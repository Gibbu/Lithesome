import { use, self, type APIReference } from '$site/index.js';

const toaster: APIReference = {
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

const toast: APIReference = {
	name: 'Toast',
	props: [use, self('Div')],
	childOf: toaster.name
};

const title: APIReference = {
	name: 'ToastTitle',
	props: [use, self('Heading')],
	childOf: toast.name
};

const message: APIReference = {
	name: 'ToastMessage',
	props: [use, self('Paragraph')],
	childOf: toast.name
};

const toasterFn: APIReference = {
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
