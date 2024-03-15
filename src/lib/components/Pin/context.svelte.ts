import { type UID } from '$lib/internal/index.js';

interface Defaults {
	value: string[];
	disabled: boolean;
	type: 'text' | 'password';
	placeholder: string;
}

interface Hooks {
	onChange: (value: string) => void;
}

export const createContext = (uid: UID, defaults: Defaults, hooks: Hooks) => {
	let inputs = $state<string[]>([]);
	let value = $state<string[]>(defaults.value);
	let disabled = $state<boolean>(defaults.disabled);
	let type = $state<'text' | 'password'>(defaults.type);
	let placeholder = $state<string>(defaults.placeholder);

	const transformedValue = $derived(value.join(''));
	const filled = $derived(value.every((el) => el.length));

	$effect(() => {
		hooks.onChange(transformedValue);
	});

	const functions = {
		register(inputId: string) {
			inputs = [...inputs, inputId];
		},
		setValue(index: number, newVal: string) {
			value[index] = newVal;
		},
		setType(newVal: 'text' | 'password') {
			type = newVal;
		},
		setDisabled(newVal: boolean) {
			disabled = newVal;
		}
	};

	return {
		uid,
		...functions,
		get inputs() {
			return inputs;
		},
		get value() {
			return value;
		},
		get disabled() {
			return disabled;
		},
		get transformedValue() {
			return transformedValue;
		},
		get type() {
			return type;
		},
		get filled() {
			return filled;
		},
		get placeholder() {
			return placeholder;
		}
	};
};
