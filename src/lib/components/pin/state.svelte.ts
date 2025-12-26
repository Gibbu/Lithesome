import { tick } from 'svelte';
import { attach } from '$lib/internals/attachment.js';
import { buildContext } from '$lib/internals/index.js';
import { ALL_ARROW_KEYS, KEYS } from '$lib/internals/keyboard.js';
import { addEvents, createAttributes } from '$lib/internals/utils.svelte.js';

import type { GetInternalProps } from '$lib/internals/types.js';
import type { CalcIndexAction } from '$lib/internals/utils.svelte.js';
import type { PinInputProps, PinProps } from '$lib/types/index.js';

const { attrs, selectors } = createAttributes('pin', ['root', 'input', 'value']);

//
// ~ROOT
//
type RootProps = GetInternalProps<PinProps>;
class PinRoot {
	$$: RootProps;

	inputs = $state<string[]>([]);

	Filled = $derived.by(
		() => this.$$.value.val.length === this.inputs.length && this.$$.value.val.every((el) => el?.length === 1)
	);

	constructor(props: RootProps) {
		this.$$ = props;

		$effect(() => {
			if (this.Filled) this.$$.onFilled?.(this.$$.value.val);
		});
	}

	setValue = (index: number, value: string) => {
		this.$$.value.val[index] = value;
	};

	registerInput = (id: string) => {
		if (!this.inputs.includes(id)) this.inputs.push(id);
	};

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.root]: '',
		'aria-disabled': this.$$.disabled.val || undefined
	}));

	state = $derived.by(() => ({
		filled: this.Filled
	}));
}

//
// ~INPUT
//
type InputProps = GetInternalProps<PinInputProps>;
class PinInput {
	$$: InputProps;

	_root: PinRoot;

	focused = $state<boolean>(false);

	Index = $derived.by(() => this._root.inputs.indexOf(this.$$.id.val));
	Value = $derived.by(() => this._root.$$.value.val[this.Index] || '');

	constructor(root: PinRoot, props: InputProps) {
		this.$$ = props;
		this._root = root;

		this._root.registerInput(this.$$.id.val);
	}

	moveFocus = (action: CalcIndexAction | number) => {
		const dir = {
			next: this.Index + 1,
			prev: this.Index - 1,
			first: 0,
			last: this._root.inputs.length - 1
		};
		const target = this._root.inputs[typeof action === 'string' ? dir[action] : action];

		if (target) (document.querySelector(`${selectors.input}#${target}`) as HTMLInputElement)?.focus();
	};

	props = $derived.by(() => ({
		id: this.$$.id.val,
		disabled: this._root.$$.disabled.val,
		placeholder: this.focused ? '' : this._root.$$.placeholder.val,
		type: this._root.$$.type.val,
		[attrs.input]: '',
		...attach((node) =>
			addEvents(node, {
				input: async (event) => {
					if (this._root.$$.disabled.val) return;

					const e = event as unknown as InputEvent & { target: HTMLInputElement };

					if (e.inputType !== 'insertText' && e.inputType !== 'deleteContentBackward') return;
					await tick();

					if (e.target.value.length > 1) e.target.value = e.data!;

					this._root.setValue(this.Index, e.data!);
					if (this.Value.length === 1) {
						this.moveFocus('next');
						return;
					}
				},
				keydown: async (e) => {
					if (this._root.$$.disabled.val) return;

					const { key } = e;

					if (key === KEYS.delete) {
						this._root.setValue(this.Index, '');
					}
					if (ALL_ARROW_KEYS.includes(key)) e.preventDefault();
					if (key === KEYS.home) this.moveFocus('first');
					if (key === KEYS.end) this.moveFocus('last');
					if (key === KEYS.arrowLeft) this.moveFocus('prev');
					if (key === KEYS.arrowRight) this.moveFocus('next');
					if (key === KEYS.delete) {
						this._root.setValue(this.Index, '');
						const target = document.querySelector(`${selectors.input}#${this.$$.id.val}`) as HTMLInputElement | null;
						if (target) target.value = '';
					}
					if (key === KEYS.backspace) {
						const selection = (e.target as HTMLInputElement).selectionStart;

						if (!selection && this.Value.length) {
							this._root.setValue(this.Index, '');
							const target = document.querySelector(`${selectors.input}#${this.$$.id.val}`) as HTMLInputElement | null;
							if (target) target.value = '';
							return;
						}
						if ((this.Index === this._root.inputs.length - 1 && !this.Value.length) || !this.Value.length) {
							await tick();
							this.moveFocus('prev');
						}
					}
				},
				focus: () => {
					if (this._root.$$.disabled.val) return;

					this.focused = true;
				},
				blur: () => {
					if (this._root.$$.disabled.val) return;

					this.focused = false;
				},
				paste: (e) => {
					if (!e.clipboardData) return;
					e.preventDefault();

					const data = e.clipboardData.getData('text');
					if (data.length < 1) return;

					const values = data.split('');
					if (values.length === 0) return;

					this._root.inputs.forEach((uid, i) => {
						this._root.setValue(i, values[i]);

						const input = document.querySelector(`${selectors.input}#${uid}`) as HTMLInputElement;
						if (input) input.value = values[i];
					});
					this.moveFocus('last');
				}
			})
		)
	}));

	state = $derived.by(() => ({
		filled: this._root.Filled,
		disabled: this._root.$$.disabled.val,
		focused: this.focused
	}));
}

//
// ~BUILDERS
//
const rootCtx = buildContext(PinRoot);

export const createPinRootContext = (props: RootProps) => {
	return rootCtx.create(props);
};
export const usePinInput = (props: InputProps) => {
	return rootCtx.register(PinInput, props);
};
