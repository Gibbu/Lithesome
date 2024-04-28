<script lang="ts">
	import { context } from './Tabs.svelte';
	import { useActions, KEYS, PREVENT_KEYS, classProp, type HandlerParam } from '$lib/internal/index.js';
	import { onMount } from 'svelte';
	import type { TabsButtonProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		disabled = false,
		value,
		onClick,
		onKeydown,
		...props
	}: TabsButtonProps = $props();

	const ctx = context();
	const active = $derived(ctx.activeTab === value);

	const handleClick = (e: HandlerParam<MouseEvent, HTMLButtonElement>) => {
		onClick?.(e);
		if (disabled) return;
		ctx.setActive(value);
	};
	const handleKeydown = (e: HandlerParam<KeyboardEvent, HTMLButtonElement>) => {
		onKeydown?.(e);
		if (disabled) return;
		const { key } = e;

		if (PREVENT_KEYS.includes(key)) e.preventDefault();

		if (key === KEYS.home) ctx.navigate('first');
		if (key === KEYS.end) ctx.navigate('last');
		if (
			(key === KEYS.arrowUp && ctx.orientation === 'vertical') ||
			(key === KEYS.arrowLeft && ctx.orientation === 'horizontal')
		)
			ctx.navigate('prev');
		if (
			(key === KEYS.arrowDown && ctx.orientation === 'vertical') ||
			(key === KEYS.arrowRight && ctx.orientation === 'horizontal')
		)
			ctx.navigate('next');
	};

	onMount(() => {
		if (!disabled) ctx.register(value);
	});
</script>

<button
	bind:this={self}
	use:useActions={use}
	class={classProp(klass, { active })}
	type="button"
	role="tab"
	tabindex={active ? 0 : -1}
	data-tabsbutton=""
	data-state={active ? 'active' : 'inactive'}
	data-value={value}
	onclick={handleClick}
	onkeydown={handleKeydown}
	{...props}
>
	{@render children({ active })}
</button>
