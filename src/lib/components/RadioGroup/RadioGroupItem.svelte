<script lang="ts">
	import { context } from './RadioGroup.svelte';
	import { log, useActions, createUID, KEYS, classProp } from '$internal';
	import { onMount } from 'svelte';
	import type { RadioGroupItemProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		disabled = $bindable(false),
		value,
		onClick,
		onKeydown,
		...props
	}: RadioGroupItemProps = $props();

	const ctx = context();
	const { uid } = createUID('radio');

	onMount(() => {
		if (!ctx) log.error('<RadioGroupItem /> must be a direct child of <RadioGroup />');
		if (!disabled)
			ctx.register({
				id: uid(),
				value,
				disabled
			});
	});

	const checked = $derived(ctx.selectedItem?.id === uid());

	const handleClick: typeof onClick = (e) => {
		onClick?.(e);
		if (!disabled) {
			ctx.setSelected({
				id: uid(),
				value,
				disabled
			});
		}
	};

	const handleKeydown: typeof onKeydown = (e) => {
		onKeydown?.(e);
		const { key } = e;

		if (key === KEYS.arrowUp || key === KEYS.arrowDown || key === KEYS.end || key === KEYS.home) e.preventDefault();
		if (key === KEYS.home) ctx.navigate('first');
		if (key === KEYS.end) ctx.navigate('last');
		if (key === KEYS.arrowUp) ctx.navigate('prev');
		if (key === KEYS.arrowDown) ctx.navigate('next');
	};
</script>

<button
	bind:this={self}
	use:useActions={use}
	class={classProp(klass, { checked })}
	type="button"
	role="radio"
	{disabled}
	aria-checked={checked}
	tabindex={!ctx.selectedItem && ctx.items[0] ? 0 : checked ? 0 : -1}
	data-radiogroupitem=""
	data-value={value}
	data-checked={checked || undefined}
	onclick={handleClick}
	onkeydown={handleKeydown}
	{...props}
>
	{@render children({ checked })}
</button>
