<script lang="ts">
	import { context } from './Accordion.svelte';
	import { useActions, classProp, type Handler } from '$lib/internal/index.js';
	import { getContext } from 'svelte';
	import type { AccordionButtonProps } from './types.js';

	let { children, class: klass, use = [], self = $bindable(), onClick, ...props }: AccordionButtonProps = $props();

	const ctx = context();
	const itemId = getContext<string>('accordionitem-id');

	const active = $derived(ctx.activeItems.includes(itemId));
	const item = $derived(ctx.items.find((el) => el.id === itemId));

	const handleClick: Handler<MouseEvent, HTMLButtonElement> = (e) => {
		onClick?.(e);
		if (!item?.disabled) ctx.toggle(itemId);
	};
</script>

<button
	type="button"
	bind:this={self}
	use:useActions={use}
	class={classProp(klass, { active, disabled: item?.disabled || false })}
	aria-expanded={active}
	aria-disabled={item?.disabled}
	aria-controls={active ? ctx.uid('content') : undefined}
	tabindex={item?.disabled ? -1 : 0}
	data-accordionbutton=""
	data-active={active || undefined}
	onclick={handleClick}
	{...props}
>
	{@render children({ active, disabled: item?.disabled || false })}
</button>
