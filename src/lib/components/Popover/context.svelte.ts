import { type UID } from '$lib/internal/index.js';

interface Hooks {
	onChange: (val: boolean) => void;
}

export const createContext = (uid: UID, visibleInitial: boolean, hooks: Hooks) => {
	let visible = $state<boolean>(visibleInitial);
	let trigger = $state<HTMLElement | null>(null);
	let content = $state<HTMLElement | null>(null);

	$effect(() => {
		hooks.onChange(visible);
	});

	const functions = {
		close() {
			visible = false;
		},
		toggle() {
			visible = !visible;
		},
		setVisible(value: boolean) {
			visible = value;
		},
		setTrigger(node: HTMLElement) {
			trigger = node;
		},
		setContent(node: HTMLElement) {
			content = node;
		}
	};
	return {
		uid,
		...functions,
		get visible() {
			return visible;
		},
		get trigger() {
			return trigger;
		},
		get content() {
			return content;
		}
	};
};
