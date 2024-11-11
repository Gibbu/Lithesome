import { self, use, type ComponentReference } from '$site/index.js';

const portal: ComponentReference = {
	name: 'Portal',
	props: [
		{
			name: 'target',
			type: 'string | HTMLElement',
			default: 'body',
			description: 'The element to mount to.'
		},
		use,
		self('Div')
	]
};

export default [portal];
