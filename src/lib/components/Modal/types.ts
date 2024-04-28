import type { Transition } from '$lib/internal/index.js';
import type { BaseProps, BasePropsNoChildren } from '$lib/internal/types.js';

export interface ModalProps extends BaseProps<HTMLDivElement> {
	/** Control the visibility of the modal. */
	visible: boolean;
	/** The element to mount the modal to. */
	portalTarget?: string | HTMLElement;
}

export interface ModalContentProps extends BaseProps<HTMLDivElement> {
	/**
	 * The `svelte/transtion` you wish to use.
	 *
	 * @see https://lithesome.dev/docs/api#transition-prop
	 */
	transition?: Transition;
}

export interface ModalDescriptionProps extends BaseProps<HTMLParagraphElement> {}

export interface ModalOverlayProps extends BasePropsNoChildren<HTMLDivElement> {
	/**
	 * The `svelte/transtion` you wish to use.
	 *
	 * @see https://lithesome.dev/docs/api#transition-prop
	 */
	transition?: Transition;
}

export interface ModalTitleProps extends BaseProps<HTMLHeadingElement> {}
