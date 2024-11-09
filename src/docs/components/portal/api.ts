import { self, use, type APIReference } from '$site/index.js';

const portal: APIReference = {
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
