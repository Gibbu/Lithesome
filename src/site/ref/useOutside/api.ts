import type { ActionReference } from '$site/index.js';

const action: ActionReference = [
	{
		name: 'callback',
		type: '() => void',
		description: 'The code to run when the outside event has been triggered.'
	},
	{
		name: 'exclude',
		type: 'HTMLElement | HTMLElement[]',
		description: 'The elements to exlcude from triggering the outside event.'
	},
	{
		name: 'on',
		type: 'DocumentEventMap',
		description: 'The event to trigger the outside callback.'
	}
];

export default action;
