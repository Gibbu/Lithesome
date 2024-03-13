<script lang="ts">
	import { context } from './Accordion.svelte';
	import { useActions, type BaseProps } from '$lib/internal/index.js';
	import { getContext } from 'svelte';

	interface Props extends BaseProps<HTMLButtonElement, { active: boolean }> {}

	let { children, class: klass, use = [], self, ...props } = $props<Props>();

	const API = context();
	const itemId = getContext<string>('accordionitem-id');

	const active = $derived(API.activeItems.includes(itemId));
	const item = API.items.find((el) => el.id === itemId);
	const classProp = $derived(typeof klass === 'function' ? klass({ active }) : klass);
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
	onclick={() => API.toggle(itemId)}
	{...props}
>
	{@render children({ active })}
</button>
