import { buildContext, createUID, KEYS, type StateValues, type Handler } from '$internal';
import { tick } from 'svelte';
import type { PinInputEvents, PinInputState, PinState, PinType } from './types.js';

//
// Root
//
type PinRootProps = StateValues<{
	value: string[];
	disabled: boolean;
	type: PinType;
	placeholder: string;
}>;
class PinRoot {
	uid = createUID('pin');

	$value: PinRootProps['value'];
	$disabled: PinRootProps['disabled'];
	$type: PinRootProps['type'];
	$placeholder: PinRootProps['placeholder'];

	inputs = $state<string[]>([]);

	TransformedValue = $derived.by(() => this.$value.val.join());
	Filled = $derived.by(
		() => this.$value.val.length === this.inputs.length && this.$value.val.every((el) => el?.length === 1)
	);

	constructor(props: PinRootProps) {
		this.$value = props.value;
		this.$disabled = props.disabled;
		this.$placeholder = props.placeholder;
		this.$type = props.type;
	}

	setValue(index: number, value: string) {
		this.$value.val[index] = value;
	}

	attrs = $derived.by(() => ({
		id: this.uid(),
		'aria-disabled': this.$disabled.val || undefined,
		'data-pin': '',
		'data-filled': this.Filled,
		'data-disabled': this.$disabled.val || undefined
	}));
	state = $derived.by<PinState>(() => ({
		filled: this.Filled
	}));
}

//
// Input
//
class PinInput {
	uid = createUID('input');

	_root: PinRoot;
	#events: PinInputEvents;

	focused = $state<boolean>(false);
	index = $derived.by<number>(() => this._root.inputs.indexOf(this.uid()));
	value = $derived.by<string>(() => this._root.$value.val[this.index] || '');

	constructor(_root: PinRoot, events: PinInputEvents) {
		this._root = _root;
		this.#events = events;

		this._root.inputs.push(this.uid());
	}

	#moveFocus = (direction: 'next' | 'prev' | 'first' | 'last') => {
		const dir = {
			next: this.index + 1,
			prev: this.index - 1,
			first: 0,
			last: this._root.inputs.length - 1
		};
		const target = this._root.inputs[dir[direction]];
		if (target) (document.querySelector(`#${target}`) as HTMLInputElement)?.focus();
	};

	#handleInput: PinInputEvents['onInput'] = async (event) => {
		if (this._root.$disabled.val) return;
		this.#events.onInput?.(event);

		const e = event as unknown as InputEvent & { target: HTMLInputElement };

		if (e.inputType !== 'insertText' && e.inputType !== 'deleteContentBackward') return;
		await tick();

		if (e.target.value.length > 1) e.target.value = e.data!;

		this._root.setValue(this.index, e.data!);
		if (this.value.length === 1) {
			this.#moveFocus('next');
			return;
		}
	};
	#handleKeydown: PinInputEvents['onKeydown'] = async (e) => {
		if (this._root.$disabled.val) return;
		this.#events.onKeydown?.(e);

		const { key } = e;

		if (key === KEYS.delete) {
			this._root.setValue(this.index, '');
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
			(this.index === this._root.inputs.length - 1 && this.value.length === 0 && key === KEYS.backspace) ||
			(key === KEYS.backspace && this.value.length === 0)
		) {
			await tick();
			this.#moveFocus('prev');
			return;
		}
	};
	#handleFocus: PinInputEvents['onFocus'] = (e) => {
		if (this._root.$disabled.val) return;
		this.#events.onFocus?.(e);

		this.focused = true;
	};
	#handleBlur: PinInputEvents['onBlur'] = (e) => {
		if (this._root.$disabled.val) return;
		this.#events.onBlur?.(e);

		this.focused = false;
	};
	#handlePaste: PinInputEvents['onPaste'] = (e) => {
		if (!e.clipboardData) return;
		this.#events.onPaste?.(e);

		e.preventDefault();

		const data = e.clipboardData.getData('text');
		if (data.length < 1) return;

		const values = data.split('');
		if (values.length === 0) return;

		this._root.inputs.forEach((uid, i) => {
			this._root.setValue(i, values[i]);

			const input = document.querySelector(`[data-pininput][id="${uid}"]`) as HTMLInputElement;
			if (input) input.value = values[i];
		});
		this.#moveFocus('last');
	};

	attrs = $derived.by(() => ({
		id: this.uid(),
		disabled: this._root.$disabled.val,
		placeholder: this.focused ? '' : this._root.$placeholder.val,
		'data-pininput': '',
		'data-filled': this._root.Filled,
		oninput: this.#handleInput,
		onkeydown: this.#handleKeydown,
		onfocus: this.#handleFocus,
		onblur: this.#handleBlur,
		onpaste: this.#handlePaste
	}));
	state = $derived.by<PinInputState>(() => ({
		filled: this._root.Filled,
		disabled: this._root.$disabled.val
	}));
}

//
// Value
//
class PinValue {
	_root: PinRoot;

	constructor(_root: PinRoot) {
		this._root = _root;
	}

	attrs = $derived.by(
		() =>
			({
				id: this._root.uid('value'),
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
const _rootContext = buildContext(PinRoot);

export const createRootContext = (props: PinRootProps) => {
	return _rootContext.createContext(props);
};
export const usePinInput = (events: PinInputEvents) => {
	return _rootContext.register(PinInput, events);
};
export const usePinValue = () => {
	return _rootContext.register(PinValue);
};
