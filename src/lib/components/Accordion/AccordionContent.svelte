<script lang="ts">
	import { context } from './Accordion.svelte';
	import { useActions, type BaseProps, getTransition, type Transition } from '$lib/internal/index.js';
	import { getContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { active: boolean }> {
		/**
		 * The `svelte/transtion` you wish to use.
		 *
		 * @see https://lithesome.dev/docs/api#transition
		 */
		transition?: Transition;
	}

	let { children, class: klass, use = [], self, transition, ...props } = $props<Props>();

	const API = context();
	const itemId = getContext<string>('accordionitem-id');

	const active = $derived(API.activeItems.includes(itemId));
	const classProp = $derived(typeof klass === 'function' ? klass({ active }) : klass);
	const _transition = getTransition(transition);
</script>

{#if _transition}
	{#if active}
		<div
			transition:_transition.fn={_transition.params}
			bind:this={self}
			data-accordioncontent=""
			data-active={active || undefined}
			use:useActions={use}
			class={classProp}
			{...props}
		>
			{@render children({ active })}
		</div>
	{/if}
{:else if active}
	<div
		bind:this={self}
		data-accordioncontent=""
		data-active={active || undefined}
		use:useActions={use}
		class={classProp}
		{...props}
	>
		{@render children({ active })}
	</div>
{/if}
