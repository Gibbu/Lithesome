<script lang="ts">
	import { context } from './Combobox.svelte';
	import { useActions, classProp, PREVENT_KEYS, KEYS, type Handler } from '$lib/internal/index.js';
	import { onMount } from 'svelte';
	import type { ComboboxInputProps } from './types.js';

	let {
		class: klass,
		use = [],
		value = $bindable(),
		self = $bindable(),
		disabled = $bindable(false),
		onClick,
		onFocus,
		onKeydown,
		...props
	}: ComboboxInputProps = $props();

	const ctx = context();

	onMount(() => {
		if (!ctx || !self) return;
		ctx.trigger = self;
	});

	const handleClick: Handler<MouseEvent, HTMLInputElement> = (e) => {
		onClick?.(e);
		if (disabled) return;

		ctx.toggle();
	};
	const handleKeydown: Handler<KeyboardEvent, HTMLInputElement> = (e) => {
		onKeydown?.(e);
		if (disabled) return;

		const { key } = e;

		ctx.touched = true;
		if (!PREVENT_KEYS.includes(key)) {
			if (!ctx.visible) ctx.open();
		}

		if (key === KEYS.arrowUp || key === KEYS.arrowDown || key === KEYS.end || key === KEYS.home) {
			e.preventDefault();
			if (!ctx.visible) ctx.open();
		}
		if (key === KEYS.home) ctx.navigate('first');
		if (key === KEYS.end) ctx.navigate('last');
		if (key === KEYS.arrowUp) ctx.navigate('prev');
		if (key === KEYS.arrowDown) ctx.navigate('next');
		if (key === KEYS.escape) ctx.close();
		if (key === KEYS.enter) {
			e.preventDefault();
			if (ctx.hoveredOption && ctx.visible) {
				(ctx.hoveredOption as HTMLButtonElement).click();
				if (!ctx.multiple) ctx.close();
			} else {
				ctx.open();
			}
		}
		if (key === 'Tab') ctx.close();
	};
</script>

<input
	type="text"
	bind:this={self}
	use:useActions={use}
	id={ctx.uid('input')}
	class={classProp(klass, { visible: ctx.visible })}
	onclick={handleClick}
	onkeydown={handleKeydown}
	bind:value
	{...props}
/>
