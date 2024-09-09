import { buildContext, createUID, defaultConfig, log, parseDuration } from '$internal';
import type { Toast, ToastConfig, ToastType } from './types.js';

export const toasts = $state<Toast[]>([]);

//
// Toaster
//
export class Toaster {
	#timeouts = new Map();

	add(type: ToastType, config: ToastConfig) {
		if (!config.title || !config.message) log.error('`title` and `message` must be provided.');

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

		this.#timeouts.set(
			toast.id,
			setTimeout(() => {
				if (toasts.find((el) => el.id === toast.id)) {
					this.removeById(toast.id);
				}
			}, duration)
		);
	}

	removeById(toastId: string) {
		const timeout = this.#timeouts.get(toastId);
		if (timeout) {
			clearTimeout(timeout);
			this.#timeouts.delete(toastId);
		}
		const index = toasts.findIndex((el) => el.id === toastId);
		toasts.splice(index, 1);
	}
}

//
// Root
//
class ToastRoot {
	uid = createUID('toast').uid;

	attrs = $derived.by(
		() =>
			({
				role: 'alert',
				'aria-labelledby': this.uid('title'),
				'aria-describedby': this.uid('description'),
				'aria-live': 'assertive',
				tabindex: -1,
				'data-toast': ''
			}) as const
	);
}

//
// Title
//
class ToastTitle {
	root: ToastRoot;

	constructor(root: ToastRoot) {
		this.root = root;
	}

	attrs = $derived.by(
		() =>
			({
				id: this.root.uid('title'),
				'data-toasttitle': ''
			}) as const
	);
}

//
// Description
//
class ToastDescription {
	root: ToastRoot;

	constructor(root: ToastRoot) {
		this.root = root;
	}

	attrs = $derived.by(
		() =>
			({
				id: this.root.uid('description'),
				'data-toastdescription': ''
			}) as const
	);
}

//
// Builders
//
const rootContext = buildContext(ToastRoot);

export const createRootContext = () => {
	return rootContext.createContext();
};

export const useToastTitle = () => {
	return rootContext.register(ToastTitle);
};

export const useToastDescription = () => {
	return rootContext.register(ToastDescription);
};
