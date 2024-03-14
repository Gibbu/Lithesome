<script lang="ts">
	import { context } from './Accordion.svelte';
	import { useActions, type BaseProps } from '$lib/internal/index.js';
	import { getContext } from 'svelte';

	interface Props extends BaseProps<HTMLButtonElement, { active: boolean; hovered: boolean }> {}

	let { children, class: klass, use = [], self, ...props } = $props<Props>();

	const API = context();
	const itemId = getContext<string>('accordionitem-id');

	const active = $derived(API.activeItems.includes(itemId));
	const hovered = $derived(API.hoveredItem?.id === itemId);
	const item = API.items.find((el) => el.id === itemId);
	const classProp = $derived(typeof klass === 'function' ? klass({ active, hovered }) : klass);

	const handleKeys = (e: KeyboardEvent) => {
		const { key } = e;
		if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'End' || key === 'Home') e.preventDefault();
		if (key === 'Home') API.navigateItems('first');
		if (key === 'End') API.navigateItems('last');
		if (key === 'ArrowUp') API.navigateItems('prev');
		if (key === 'ArrowDown') API.navigateItems('next');
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
	data-hovered={active || undefined}
	use:useActions={use}
	class={classProp}
	onclick={() => API.toggle(itemId)}
	onkeydown={handleKeys}
	{...props}
>
	{@render children({ active, hovered })}
</button>
