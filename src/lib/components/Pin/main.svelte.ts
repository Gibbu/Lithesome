import { buildContext, createUID, KEYS, type ContextChange, type Handler, type HandlerParam } from '$internal';
import { tick } from 'svelte';
import type { PinType } from './types.js';

//
// Root
//
interface PinRootProps {
	value: string | string[];
	disabled: boolean;
	type: PinType;
	placeholder: string;
}
class PinRoot {
	uid = createUID('pin').uid;
	inputs = $state<string[]>([]);
	value = $state<string[]>([]);
	disabled = $state<boolean>(false);
	type = $state<PinType>('text');
	placeholder = $state<string>('');

	TransformedValue = $derived(this.value.join());
	Filled = $derived(this.value.length === this.inputs.length && this.value.every((el) => el?.length === 1));

	constructor(props: ContextChange<PinRootProps>) {
		this.value = typeof props.value === 'string' ? props.value.split('') : props.value;
		this.disabled = props.disabled;
		this.placeholder = props.placeholder;
		this.type = props.type;

		$effect(() => {
			props.onContextChange({
				value: this.value,
				disabled: this.disabled,
				placeholder: this.placeholder,
				type: this.type
			});
		});
	}
	onComponentChange(props: PinRootProps) {
		this.value = typeof props.value === 'string' ? props.value.split('') : props.value;
		this.disabled = props.disabled;
		this.placeholder = props.placeholder;
		this.type = props.type;
	}

	setValue(index: number, value: string) {
		this.value[index] = value;
	}

	attrs = $derived.by(
		() =>
			({
				id: this.uid(),
				'aria-disabled': this.disabled || undefined,
				'data-pin': '',
				'data-filled': this.Filled,
				'data-disabled': this.disabled || undefined
			}) as const
	);
	state = $derived.by(() => ({
		filled: this.Filled
	}));
}

//
// Input
//
class PinInput {
	root: PinRoot;
	uid = createUID('input').uid;

	#focused = $state<boolean>(false);
	#index = $derived.by<number>(() => this.root.inputs.indexOf(this.uid()));
	#value = $derived.by<string>(() => this.root.value[this.#index] || '');

	constructor(root: PinRoot) {
		this.root = root;

		this.root.inputs.push(this.uid());
	}

	#moveFocus = (direction: 'next' | 'prev' | 'first' | 'last') => {
		const dir = {
			next: this.#index + 1,
			prev: this.#index - 1,
			first: 0,
			last: this.root.inputs.length - 1
		};
		const target = this.root.inputs[dir[direction]];
		if (target) (document.querySelector(`#${target}`) as HTMLInputElement)?.focus();
	};

	#handleInput = async (event: Event) => {
		if (this.root.disabled) return;
		const e = event as unknown as InputEvent & { target: HTMLInputElement };

		if (e.inputType !== 'insertText' && e.inputType !== 'deleteContentBackward') return;
		await tick();

		if (e.target.value.length > 1) e.target.value = e.data!;

		this.root.setValue(this.#index, e.data!);
		if (this.#value.length === 1) {
			this.#moveFocus('next');
			return;
		}
	};
	#handleKeydown: Handler<KeyboardEvent, HTMLInputElement> = async (e) => {
		if (this.root.disabled) return;
		const { key } = e;

		if (key === KEYS.delete) {
			this.root.setValue(this.#index, '');
		}
		if (key === KEYS.home) {
			e.preventDefault();
			this.#moveFocus('first');
		}
		if (key === KEYS.end) {
			e.preventDefault();
			this.#moveFocus('last');
		}
		if (key === KEYS.arrowLeft) {
			e.preventDefault();
			this.#moveFocus('prev');
		}
		if (key === KEYS.arrowRight) {
			e.preventDefault();
			this.#moveFocus('next');
		}
		if (
			(this.#index === this.root.inputs.length - 1 && this.#value.length === 0 && key === KEYS.backspace) ||
			(key === KEYS.backspace && this.#value.length === 0)
		) {
			await tick();
			this.#moveFocus('prev');
			return;
		}
	};
	#handleFocus = () => {
		if (this.root.disabled) return;
		this.#focused = true;
	};
	#handleBlur = () => {
		if (this.root.disabled) return;
		this.#focused = false;
	};
	#handlePaste: Handler<ClipboardEvent, HTMLInputElement> = (e) => {
		if (!e.clipboardData) return;
		e.preventDefault();

		const data = e.clipboardData.getData('text');
		if (data.length < 1) return;

		const values = data.split('');
		if (values.length === 0) return;

		this.root.inputs.forEach((_, i) => {
			this.root.setValue(i, values[i]);
		});
		this.#moveFocus('last');
	};

	attrs = $derived.by(
		() =>
			({
				id: this.uid(),
				disabled: this.root.disabled,
				placeholder: this.#focused ? '' : this.root.placeholder,
				'data-pininput': '',
				'data-filled': this.root.Filled,
				oninput: this.#handleInput,
				onkeydown: this.#handleKeydown,
				onfocus: this.#handleFocus,
				onblur: this.#handleBlur,
				onpaste: this.#handlePaste
			}) as const
	);
	state = $derived.by(() => ({
		filled: this.root.Filled,
		disabled: this.root.disabled
	}));
}

//
// Value
//
class PinValue {
	root: PinRoot;

	constructor(root: PinRoot) {
		this.root = root;
	}

	attrs = $derived.by(
		() =>
			({
				id: this.root.uid('value'),
				'aria-hidden': 'true',
				tabindex: -1,
				hidden: true,
				'data-pininput': ''
			}) as const
	);
}

//
// Builder
//
const rootContext = buildContext(PinRoot);

export const createRootContext = (props: ContextChange<PinRootProps>) => {
	return rootContext.createContext(props);
};
export const usePinInput = () => {
	return rootContext.register(PinInput);
};
export const usePinValue = () => {
	return rootContext.register(PinValue);
};
