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
		const uid = createUID('toast');

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
	uid = createUID('toast');

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
	_root: ToastRoot;

	constructor(_root: ToastRoot) {
		this._root = _root;
	}

	attrs = $derived.by(
		() =>
			({
				id: this._root.uid('title'),
				'data-toasttitle': ''
			}) as const
	);
}

//
// Description
//
class ToastDescription {
	_root: ToastRoot;

	constructor(_root: ToastRoot) {
		this._root = _root;
	}

	attrs = $derived.by(
		() =>
			({
				id: this._root.uid('description'),
				'data-toastdescription': ''
			}) as const
	);
}

//
// Builders
//
const _rootContext = buildContext(ToastRoot);

export const createRootContext = () => {
	return _rootContext.createContext();
};

export const useToastTitle = () => {
	return _rootContext.register(ToastTitle);
};

export const useToastDescription = () => {
	return _rootContext.register(ToastDescription);
};
