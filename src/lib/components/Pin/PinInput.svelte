<script lang="ts">
	import { context } from './Pin.svelte';
	import {
		log,
		useActions,
		createUID,
		KEYS,
		classProp,
		type BaseProps,
		type Handler,
		type HandlerParam
	} from '$lib/internal/index.js';
	import { onMount, tick } from 'svelte';

	interface Props extends Omit<BaseProps<HTMLInputElement, { filled: boolean; disabled: boolean }>, 'children'> {
		onKeydown?: Handler<KeyboardEvent, HTMLInputElement>;
		onInput?: Handler<Event, HTMLInputElement>;
		onFocus?: Handler<FocusEvent, HTMLInputElement>;
		onBlur?: Handler<FocusEvent, HTMLInputElement>;
		onPaste?: Handler<ClipboardEvent, HTMLInputElement>;
	}

	let { class: klass, use = [], self, onKeydown, onInput, onFocus, onBlur, onPaste, ...props }: Props = $props();

	const API = context();
	const { uid } = createUID('input');
	const index = $derived(API.inputs.indexOf(uid()));
	let focused = $state<boolean>(false);
	let value = $derived<string>(API.value[index] || '');

	onMount(() => {
		if (!API) log.error('<PinInput /> must be a direct child of <Pin />');
		API.register(uid());
	});

	const handleInput = async (event: HandlerParam<Event, HTMLInputElement>) => {
		onInput?.(event);
		if (API.disabled) return;
		const e = event as unknown as InputEvent & { target: HTMLInputElement };

		if (e.inputType !== 'insertText' && e.inputType !== 'deleteContentBackward') return;
		await tick();

		API.setValue(index, e.data!);
		if (value.length === 1) {
			moveFocus('next');
			return;
		}
	};
	const handleKeyDown = async (e: HandlerParam<KeyboardEvent, HTMLInputElement>) => {
		onKeydown?.(e);
		if (API.disabled) return;
		const { key } = e;

		if (key === KEYS.delete) {
			API.setValue(index, '');
		}
		if (key === KEYS.home) {
			e.preventDefault();
			moveFocus('first');
		}
		if (key === KEYS.end) {
			e.preventDefault();
			moveFocus('last');
		}
		if (key === KEYS.arrowLeft) {
			e.preventDefault();
			moveFocus('prev');
		}
		if (key === KEYS.arrowRight) {
			e.preventDefault();
			moveFocus('next');
		}
		if (
			(index === API.inputs.length - 1 && value.length === 0 && key === KEYS.backspace) ||
			(key === KEYS.backspace && value.length === 0)
		) {
			await tick();
			moveFocus('prev');
			return;
		}
	};
	const handleFocus = (e: HandlerParam<FocusEvent, HTMLInputElement>) => {
		onFocus?.(e);
		if (API.disabled) return;
		focused = true;
	};
	const handleBlur = (e: HandlerParam<FocusEvent, HTMLInputElement>) => {
		onBlur?.(e);
		if (API.disabled) return;
		focused = false;
	};
	const handlePaste = (e: HandlerParam<ClipboardEvent, HTMLInputElement>) => {
		onPaste?.(e);

		if (!e.clipboardData) return;
		e.preventDefault();

		const data = e.clipboardData.getData('text');
		if (data.length < 1) return;

		const values = data.split('');
		if (values.length === 0) return;

		API.inputs.forEach((_, i) => {
			API.setValue(i, values[i]);
		});
		moveFocus('last');
	};

	const moveFocus = (direction: 'next' | 'prev' | 'first' | 'last') => {
		const dir = {
			next: index + 1,
			prev: index - 1,
			first: 0,
			last: API.inputs.length - 1
		};
		const target = API.inputs[dir[direction]];
		if (target) (document.querySelector(`#${target}`) as HTMLInputElement)?.focus();
	};
</script>

<input
	bind:this={self}
	use:useActions={use}
	{value}
	id={uid()}
	class={classProp(klass, { filled: API.filled, disabled: API.disabled })}
	disabled={API.disabled}
	placeholder={focused ? '' : API.placeholder}
	data-pininput=""
	data-filled={API.filled || undefined}
	oninput={handleInput}
	onkeydown={handleKeyDown}
	onfocus={handleFocus}
	onblur={handleBlur}
	onpaste={handlePaste}
	{...props}
/>
