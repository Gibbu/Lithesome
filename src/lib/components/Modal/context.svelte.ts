import { disableScroll, type UID } from '$lib/internal/index.js';

export const createContext = (uid: UID, visibleInitial: boolean) => {
	let visible = $state<boolean>(visibleInitial);

	$effect(() => {
		disableScroll(visible && !document.body.style.overflow);
	});

	const functions = {
		updateVisible(value: boolean) {
			visible = value;
		}
	};
	return {
		uid,
		...functions,
		get visible() {
			return visible;
		}
	};
};
