import type { FloatingContent, Props, PropsNoRender } from '$lib/internals/index.js';

//
// ~ROOT
//
export interface ModalProps<S = any> extends PropsNoRender<S>, FloatingContent {
	/**
	 * Allows the backdrop to close the modal if the user clicks on it.
	 */
	closeOnBackdropClick?: boolean;
}

//
// ~TRIGGER
//
export interface ModalTriggerProps<P = any, S = any> extends Props<HTMLButtonElement, P, S> {}

//
// ~BACKDROP
//
export interface ModalBackdropProps<P = any, S = any> extends Props<HTMLInputElement, P, S> {}

//
// ~CONTENT
//
export interface ModalContentProps<P = any, S = any> extends Props<HTMLInputElement, P, S> {}

//
// ~TITLE
//
export interface ModalTitleProps<P = any, S = any> extends Props<HTMLInputElement, P, S> {}

//
// ~DESCRIPTION
//
export interface ModalDescriptionProps<P = any, S = any> extends Props<HTMLInputElement, P, S> {}
