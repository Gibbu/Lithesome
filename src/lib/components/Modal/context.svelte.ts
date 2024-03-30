import { disableScroll, createUID } from '$lib/internal/index.js';

interface InitialValues {
	visible?: boolean;
}

export const createContext = (init: InitialValues) => {
	const { uid } = createUID('modal');

	let visible = $state<boolean>(init.visible || false);

	$effect(() => {
		disableScroll(visible && !document.body.style.overflow);
	});

	return {
		uid,
		setVisible(value: boolean) {
			visible = value;
		},
		get visible() {
			return visible;
		}
	};
};
