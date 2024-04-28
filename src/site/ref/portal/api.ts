import type { APIReference } from '$site/types.js';
import { self, use } from '../helpers.js';

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
