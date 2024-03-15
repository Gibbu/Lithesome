export const KEYS = {
	arrowUp: 'ArrowUp',
	arrowDown: 'ArrowDown',
	arrowLeft: 'ArrowLeft',
	arrowRight: 'ArrowRight',
	control: 'Control',
	delete: 'Delete',
	end: 'End',
	enter: 'Enter',
	escape: 'Escape',
	home: 'Home',
	meta: 'Meta',
	pageUp: 'PageUp',
	pageDown: 'PageDown',
	shift: 'Shift',
	space: ' ',
	tab: 'Tab',
	backspace: 'Backspace'
};

export const ALL_KEYS = Object.values(KEYS);

export const PREVENT_KEYS = [
	KEYS.arrowUp,
	KEYS.arrowDown,
	KEYS.arrowLeft,
	KEYS.arrowRight,
	KEYS.home,
	KEYS.end,
	KEYS.meta,
	KEYS.pageUp,
	KEYS.pageDown
];
