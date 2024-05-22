import { Context, createUID, log, parseDuration, defaultConfig } from '$lib/internal/index.js';
import type { Toast, ToastConfig, ToastType } from './types.js';

export let toasts = $state<Toast[]>([]);

export class ToastContext extends Context {
	constructor() {
		super('toast');
	}
}

export class Toaster {
	add(type: ToastType, config: ToastConfig) {
		if (!config.title || !config.message) throw log.error('`title` and `message` must be provided.');

		const duration = parseDuration(config.duration || '5s');
		const { uid } = createUID('toast');

		const toast: Toast = {
			id: uid(),
			type,
			config: defaultConfig(config, {
				title: '',
				message: '',
				dismissable: false,
				duration,
				props: {}
			})
		};

		toasts.push(toast);

		setTimeout(() => {
			if (toasts.find((el) => el.id === toast.id)) {
				this.removeById(toast.id);
			}
		}, duration);
	}
	removeById(toastId: string) {
		const i = toasts.findIndex((el) => el.id === toastId);
		toasts.splice(i, 1);
	}
}

export const toaster = new Toaster();
