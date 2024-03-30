import { createUID } from '$lib/internal/index.js';

interface InitialValues {
	value?: string[];
	disabled?: boolean;
	type?: 'text' | 'password';
	placeholder?: string;
}

interface Hooks {
	onChange?: (value: string) => void;
}

export const createContext = (init: InitialValues, hooks?: Hooks) => {
	const { uid } = createUID('pin');

	let inputs = $state<string[]>([]);
	let value = $state<string[]>(init.value || []);
	let disabled = $state<boolean>(init.disabled || false);
	let type = $state<'text' | 'password'>(init.type || 'text');
	let placeholder = $state<string>(init.placeholder || '');

	const transformedValue = $derived(value.join(''));
	const filled = $derived(value.every((el) => el?.length));

	$effect(() => {
		hooks?.onChange?.(transformedValue);
	});

	return {
		uid,
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
		},
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
