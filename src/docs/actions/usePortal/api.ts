import type { ActionReference } from '$site/index.js';

const action: ActionReference = [
	{
		name: 'target',
		type: `'string' | HTMLElement`,
		description: 'The target element to mount to.',
		default: 'body'
	}
];

export default action;
