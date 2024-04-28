<script lang="ts">
	import { context } from './Pin.svelte';
	import { log, useActions, createUID, KEYS, classProp, type HandlerParam } from '$lib/internal/index.js';
	import { onMount, tick } from 'svelte';
	import type { PinInputProps } from './types.js';

	let {
		class: klass,
		use = [],
		self = $bindable(),
		onKeydown,
		onInput,
		onFocus,
		onBlur,
		onPaste,
		...props
	}: PinInputProps = $props();

	const ctx = context();
	const { uid } = createUID('input');
	const index = $derived(ctx.inputs.indexOf(uid()));
	let focused = $state<boolean>(false);
	let value = $derived<string>(ctx.value[index] || '');

	onMount(() => {
		if (!ctx) log.error('<PinInput /> must be a direct child of <Pin />');
		ctx.register(uid());
	});

	const handleInput = async (event: HandlerParam<Event, HTMLInputElement>) => {
		onInput?.(event);
		if (ctx.disabled) return;
		const e = event as unknown as InputEvent & { target: HTMLInputElement };

		if (e.inputType !== 'insertText' && e.inputType !== 'deleteContentBackward') return;
		await tick();

		if (e.target.value.length > 1) e.target.value = e.data!;

		ctx.setValue(index, e.data!);
		if (value.length === 1) {
			moveFocus('next');
			return;
		}
	};
	const handleKeyDown = async (e: HandlerParam<KeyboardEvent, HTMLInputElement>) => {
		onKeydown?.(e);
		if (ctx.disabled) return;
		const { key } = e;

		if (key === KEYS.delete) {
			ctx.setValue(index, '');
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
			(index === ctx.inputs.length - 1 && value.length === 0 && key === KEYS.backspace) ||
			(key === KEYS.backspace && value.length === 0)
		) {
			await tick();
			moveFocus('prev');
			return;
		}
	};
	const handleFocus = (e: HandlerParam<FocusEvent, HTMLInputElement>) => {
		onFocus?.(e);
		if (ctx.disabled) return;
		focused = true;
	};
	const handleBlur = (e: HandlerParam<FocusEvent, HTMLInputElement>) => {
		onBlur?.(e);
		if (ctx.disabled) return;
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

		ctx.inputs.forEach((_, i) => {
			ctx.setValue(i, values[i]);
		});
		moveFocus('last');
	};

	const moveFocus = (direction: 'next' | 'prev' | 'first' | 'last') => {
		const dir = {
			next: index + 1,
			prev: index - 1,
			first: 0,
			last: ctx.inputs.length - 1
		};
		const target = ctx.inputs[dir[direction]];
		if (target) (document.querySelector(`#${target}`) as HTMLInputElement)?.focus();
	};
</script>

<input
	bind:this={self}
	use:useActions={use}
	{value}
	id={uid()}
	class={classProp(klass, { filled: ctx.filled, disabled: ctx.disabled })}
	disabled={ctx.disabled}
	placeholder={focused ? '' : ctx.placeholder}
	data-pininput=""
	data-filled={ctx.filled}
	oninput={handleInput}
	onkeydown={handleKeyDown}
	onfocus={handleFocus}
	onblur={handleBlur}
	onpaste={handlePaste}
	{...props}
/>
