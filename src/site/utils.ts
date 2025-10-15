import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { ClassValue } from 'clsx';
import type { Attachment } from 'svelte/attachments';

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

interface CopyConfig {
	text?: string;
	on?: string;
	onSuccess?: () => void;
}
export const copy = (config: CopyConfig): Attachment<HTMLElement> => {
	const { on = 'click', onSuccess } = config;
	return (node) => {
		const event = async () => {
			const { text = node.textContent?.trim()! } = config;
			try {
				await navigator.clipboard.writeText(text);
				onSuccess?.();
			} catch (err) {
				console.error(err);
			}
		};

		node.addEventListener(on, event);

		return () => {
			node.removeEventListener(on, event);
		};
	};
};
