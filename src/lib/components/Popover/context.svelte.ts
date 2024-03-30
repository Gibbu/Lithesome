import { createUID } from '$lib/internal/index.js';

interface InitialValues {
	visible?: boolean;
}

interface Hooks {
	onChange: (val: boolean) => void;
}

export const createContext = (init: InitialValues, hooks: Hooks) => {
	const { uid } = createUID('popover');

	let visible = $state<boolean>();
	let trigger = $state<HTMLElement | null>(null);
	let content = $state<HTMLElement | null>(null);

	$effect(() => {
		hooks.onChange(init.visible || false);
	});

	return {
		uid,
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
		},
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
