<script lang="ts">
	import { context } from './Menu.svelte';
	import { useActions, classProp, type BaseProps, type Handler, type HandlerParam } from '$lib/internal/index.js';
	import { createUID } from '$lib/internal/index.js';
	import { onMount } from 'svelte';

	type HandlerEl = HTMLButtonElement | HTMLAnchorElement;

	interface Props extends BaseProps<HTMLAnchorElement | HTMLButtonElement, { hovered: boolean }> {
		href?: string;
		disabled?: boolean;
		onClick?: Handler<MouseEvent, HandlerEl>;
		onMouseover?: Handler<MouseEvent, HandlerEl>;
		onFocus?: Handler<FocusEvent, HandlerEl>;
	}

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
	}: Props = $props();

	const API = context();
	const { uid } = createUID('item');

	const hovered = $derived(API.hoveredItem === uid());

	onMount(() => {
		if (!API.items.includes(uid()) && !disabled) API.register(uid());

		return () => {
			API.unregister(uid());
		};
	});

	const handleClick = (e: HandlerParam<MouseEvent, HandlerEl>) => {
		if (!disabled) {
			API.close();
			onClick?.(e);
		}
	};
	const handleMouseover = (e: HandlerParam<MouseEvent, HandlerEl>) => {
		API.setHoveredItem(uid());
		onMouseover?.(e);
	};
	const handleFocus = (e: HandlerParam<FocusEvent, HandlerEl>) => {
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
