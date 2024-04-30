import { createFocusTrap, type FocusTrap, type Options } from 'focus-trap';

/**
 * Creates a focus trap.
 */
export const useTrap = (node: HTMLElement, options: Options = { fallbackFocus: node }) => {
	let trap: undefined | FocusTrap;

	if (trap) return;

	trap = createFocusTrap(node, options);
	trap.activate();

	return {
		destroy() {
			trap?.deactivate();
			trap = undefined;
		}
	};
};
