import type { Transition } from '$lib/internal/index.js';
import type { Props, PropsNoChildren } from '$lib/internal/types.js';

export interface ModalProps extends Props<HTMLDivElement> {
	/** Control the visibility of the modal. */
	visible: boolean;
	/** The element to mount the modal to. */
	portalTarget?: string | HTMLElement;
}

export interface ModalContentProps extends Props<HTMLDivElement> {
	/**
	 * The `svelte/transtion` you wish to use.
	 *
	 * @see https://lithesome.dev/docs/api#transition-prop
	 */
	transition?: Transition;
}

export interface ModalDescriptionProps extends Props<HTMLParagraphElement> {}

export interface ModalOverlayProps extends PropsNoChildren<HTMLDivElement> {
	/**
	 * The `svelte/transtion` you wish to use.
	 *
	 * @see https://lithesome.dev/docs/api#transition-prop
	 */
	transition?: Transition;
}

export interface ModalTitleProps extends Props<HTMLHeadingElement> {}
