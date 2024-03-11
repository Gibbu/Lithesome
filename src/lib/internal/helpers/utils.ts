export type CalcIndexAction = 'prev' | 'next' | 'first' | 'last';

export const calculateIndex = <T>(
	action: CalcIndexAction,
	items: T[] | readonly T[],
	index: number,
	loop: boolean = false
) => {
	if (action === 'first') index = 0;
	if (action === 'last') index = items.length - 1;

	if (action === 'prev') {
		if (loop) index = index === -1 ? items.length - 1 : index !== 0 ? index - 1 : items.length - 1;
		else index = index === -1 ? items.length - 1 : index >= 1 ? index - 1 : index;
	}
	if (action === 'next') {
		if (loop) index = index !== items.length - 1 ? index + 1 : 0;
		else index = index !== items.length - 1 ? index + 1 : index;
	}

	return index;
};

export type UID = (component?: string) => string;

/**
 * Creates a unique ID to be used for accessability.
 */
export const createUID = (namespace: string) => {
	const UID_SET = 'qwertyuiopasdfghjklzxcvbnm1234567890_-';
	const uid = '123456'
		.split('')
		.map(() => UID_SET.charAt(Math.floor(38 * Math.random())))
		.join('');

	return {
		uid: (component?: string) => {
			const id = `${namespace}-${uid}`;
			return component ? `${id}-${component}` : id;
		}
	};
};

export const log = {
	error(message: string) {
		throw Error(`[Lithesome] ${message}`);
	}
};
