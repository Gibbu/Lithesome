<script lang="ts">
	import { context } from './Accordion.svelte';
	import { useActions, type BaseProps, getTransition, type Transition } from '$lib/internal/index.js';
	import { getContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { active: boolean }> {
		/**
		 * The `svelte/transtion` you wish to use.
		 *
		 * @see https://lithesome.dev/docs/api#transition-prop
		 */
		transition?: Transition;
	}

	let { children, class: klass, use = [], self, transition, ...props } = $props<Props>();

	const API = context();
	const itemId = getContext<string>('accordionitem-id');

	const active = $derived(API.activeItems.includes(itemId));
	const classProp = $derived(typeof klass === 'function' ? klass({ active }) : klass);
	const _transition = getTransition(transition);
	const attrs = $derived({
		id: API.uid('content'),
		'data-accordioncontent': '',
		'data-active': active || undefined,
		class: classProp
	} as const);
</script>

{#if _transition}
	{#if active}
		<div
			in:_transition.in.fn={_transition.in.params}
			out:_transition.out.fn={_transition.out.params}
			bind:this={self}
			use:useActions={use}
			{...attrs}
			{...props}
		>
			{@render children({ active })}
		</div>
	{/if}
{:else if active}
	<div bind:this={self} use:useActions={use} {...attrs} {...props}>
		{@render children({ active })}
	</div>
{/if}
