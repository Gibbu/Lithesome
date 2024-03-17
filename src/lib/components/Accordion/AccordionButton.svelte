<script lang="ts">
	import { context } from './Accordion.svelte';
	import { useActions, type BaseProps, type Handler, type HandlerParam } from '$lib/internal/index.js';
	import { getContext } from 'svelte';

	interface Props extends BaseProps<HTMLButtonElement, { active: boolean }> {
		onClick?: Handler<MouseEvent, HTMLButtonElement>;
	}

	let { children, class: klass, use = [], self, onClick, ...props }: Props = $props();

	const API = context();
	const itemId = getContext<string>('accordionitem-id');

	const active = $derived(API.activeItems.includes(itemId));
	const item = API.items.find((el) => el.id === itemId);
	const classProp = $derived(typeof klass === 'function' ? klass({ active }) : klass);

	const handleClick = (e: HandlerParam<MouseEvent, HTMLButtonElement>) => {
		API.toggle(itemId);
		onClick?.(e);
	};
</script>

<button
	type="button"
	bind:this={self}
	aria-expanded={active}
	aria-disabled={item?.disabled}
	aria-controls={active ? API.uid('content') : undefined}
	data-accordiontrigger=""
	data-active={active || undefined}
	use:useActions={use}
	class={classProp}
	onclick={handleClick}
	{...props}
>
	{@render children({ active })}
</button>
