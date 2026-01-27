import type { FloatingContent, Props, PropsNoRender } from '$lib/internals/index.js';

//
// ~ROOT
//
export interface ModalProps extends PropsNoRender<ModalState>, Omit<FloatingContent, 'floatingConfig'> {
	/**
	 * Allows the backdrop to close the modal if the user clicks on it.
	 */
	closeOnBackdropClick?: boolean;
}
export interface ModalState {
	/**
	 * True if the contents are visible.
	 */
	visible: boolean;
}

//
// ~TRIGGER
//
export interface ModalTriggerProps<P = any> extends Props<HTMLButtonElement, P, ModalTriggerState> {}
export interface ModalTriggerState {
	/**
	 * True if the contents are visible.
	 */
	visible: boolean;
}

//
// ~BACKDROP
//
export interface ModalBackdropProps<P = any> extends Props<HTMLElement, P, ModalBackdropState> {}
export interface ModalBackdropState {
	/**
	 * True if the contents are visible.
	 */
	visible: boolean;
}

//
// ~CONTENT
//
export interface ModalContentProps<P = any> extends Props<HTMLElement, P, ModalContentState> {}
export interface ModalContentState {
	/**
	 * True if the contents are visible.
	 */
	visible: boolean;
}

//
// ~TITLE
//
export interface ModalTitleProps<P = any> extends Props<HTMLHeadElement, P, any> {}

//
// ~DESCRIPTION
//
export interface ModalDescriptionProps<P = any> extends Props<HTMLParagraphElement, P, any> {}
