<script lang="ts">
	import { context } from './Menu.svelte';
	import { useActions, type BaseProps } from '$lib/internal/index.js';
	import { createUID } from '$lib/internal/index.js';
	import { onMount } from 'svelte';

	interface Props extends BaseProps<HTMLAnchorElement | HTMLButtonElement, { hovered: boolean }> {
		href?: string;
		disabled?: boolean;
		onClick?: () => void;
	}

	let { children, class: klass, use = [], disabled, href, onClick, ...props } = $props<Props>();

	const API = context();
	const { uid } = createUID('item');

	onMount(() => {
		if (!API.items.includes(uid()) && !disabled) API.register(uid());

		return () => {
			API.unregister(uid());
		};
	});

	const handleClick = () => {
		if (!disabled) {
			API.close();
			onClick?.();
		}
	};

	const hovered = $derived(API.hoveredItem === uid());
	const classProp = $derived(typeof klass === 'function' ? klass({ hovered }) : klass);
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	use:useActions={use}
	id={uid()}
	class={classProp}
	data-hovered={hovered ? '' : undefined}
	data-menuitem=""
	href={href || undefined}
	role="menuitem"
	tabindex="0"
	{disabled}
	onmouseover={() => API.setHoveredItem(uid())}
	onfocus={() => {}}
	onclick={handleClick}
	{...props}
>
	{@render children({ hovered })}
</svelte:element>
