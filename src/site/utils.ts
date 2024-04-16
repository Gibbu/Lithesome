import { isBrowser } from '$lib/internal/index.js';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

interface CopyConfig {
	on: string;
	text?: string;
	onSuccess?: () => void;
}
export const copy = (node: HTMLElement, config: CopyConfig) => {
	const { on = 'click', onSuccess } = config;

	node.addEventListener(on, async () => {
		const { text = node.textContent?.trim()! } = config;
		try {
			await navigator.clipboard.writeText(text);
			onSuccess?.();
		} catch (err) {
			console.error(err);
		}
	});
};

export const isMobile = isBrowser && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
