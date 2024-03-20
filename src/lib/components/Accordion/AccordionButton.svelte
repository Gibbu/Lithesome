<script lang="ts">
	import { context } from './Accordion.svelte';
	import { useActions, type BaseProps, type Handler, type HandlerParam } from '$lib/internal/index.js';
	import { getContext } from 'svelte';

	interface Props extends BaseProps<HTMLButtonElement, { active: boolean; disabled: boolean }> {
		onClick?: Handler<MouseEvent, HTMLButtonElement>;
	}

	let { children, class: klass, use = [], self, onClick, ...props }: Props = $props();

	const API = context();
	const itemId = getContext<string>('accordionitem-id');

	const active = $derived(API.activeItems.includes(itemId));
	const item = $derived(API.items.find((el) => el.id === itemId));
	const classProp = $derived(
		typeof klass === 'function' ? klass({ active, disabled: item?.disabled || false }) : klass
	);

	const handleClick = (e: HandlerParam<MouseEvent, HTMLButtonElement>) => {
		onClick?.(e);
		if (!item?.disabled) API.toggle(itemId);
	};
</script>

<button
	type="button"
	bind:this={self}
	use:useActions={use}
	class={classProp}
	aria-expanded={active}
	aria-disabled={item?.disabled}
	aria-controls={active ? API.uid('content') : undefined}
	tabindex={item?.disabled ? -1 : 0}
	data-accordionbutton=""
	data-active={active || undefined}
	onclick={handleClick}
	{...props}
>
	{@render children({ active, disabled: item?.disabled || false })}
</button>
