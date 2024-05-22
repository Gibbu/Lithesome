import type { Props } from '$lib/internal/index.js';

export type ToastType = 'success' | 'warning' | 'error' | 'info' | 'attention';

export interface ToastConfig {
	/** The title of the toast. */
	title: string;
	/** The message to be displayed. */
	message: string;
	/** The durtation of the toast to be visible. */
	duration?: string | number;
	/** Allows the toast to be removed early. */
	dismissable?: boolean;
	/** Any custom props that you wish to pass down. */
	props?: Record<string, any>;
}

export interface Toast {
	/** The unique ID ofthe toast. */
	id: string;
	/** The type of the toast. */
	type: ToastType;
	config: ToastConfig;
}

export interface ToasterProps extends Props<HTMLDivElement, Toast[]> {
	/** The element to portal the content menu to. */
	portalTarget?: string | HTMLElement;
}

export interface ToastProps extends Props<HTMLDivElement> {}

export interface ToastTitleProps extends Props<HTMLHeadingElement> {}

export interface ToastMessageProps extends Props<HTMLParagraphElement> {}
