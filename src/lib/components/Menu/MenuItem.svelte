<script lang="ts">
	import { context } from './Menu.svelte';
	import { useActions, classProp } from '$internal';
	import { createUID } from '$internal';
	import { onMount } from 'svelte';
	import type { MenuItemProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		disabled,
		self = $bindable(),
		href,
		onClick,
		onMouseover,
		onFocus,
		...props
	}: MenuItemProps = $props();

	const ctx = context();
	const { uid } = createUID('item');

	const hovered = $derived(ctx.hoveredItem === uid());

	onMount(() => {
		if (!ctx.items.includes(uid()) && !disabled) ctx.register(uid());

		return () => {
			ctx.unregister(uid());
		};
	});

	const handleClick: typeof onClick = (e) => {
		if (!disabled) {
			ctx.close();
			onClick?.(e);
		}
	};
	const handleMouseover: typeof onMouseover = (e) => {
		ctx.setHovered(uid());
		onMouseover?.(e);
	};
	const handleFocus: typeof onFocus = (e) => {
		onFocus?.(e);
	};
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	bind:this={self}
	use:useActions={use}
	id={uid()}
	class={classProp(klass, { hovered })}
	href={href || undefined}
	disabled={disabled || undefined}
	role="menuitem"
	tabindex="0"
	data-hovered={hovered ? '' : undefined}
	data-menuitem=""
	onmouseover={handleMouseover}
	onfocus={handleFocus}
	onclick={handleClick}
	{...props}
>
	{@render children({ hovered })}
</svelte:element>
