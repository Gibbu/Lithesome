import { use, self } from '../helpers.js';
import type { APIReference } from '$site/types.js';

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
		}
	]
};

export default [toaster, toast, title, message, toasterFn];
