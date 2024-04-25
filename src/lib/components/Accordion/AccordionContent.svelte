<script lang="ts">
	import { context } from './Accordion.svelte';
	import { useActions, getTransition, classProp, type BaseProps, type Transition } from '$lib/internal/index.js';
	import { getContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { active: boolean }> {
		/**
		 * The `svelte/transtion` you wish to use.
		 *
		 * @see https://lithesome.dev/docs/api#transition-prop
		 */
		transition?: Transition;
	}

	let { children, class: klass, use = [], self = $bindable(), transition, ...props }: Props = $props();

	const ctx = context();
	const itemId = getContext<string>('accordionitem-id');

	const active = $derived(ctx.activeItems.includes(itemId));
	const { inTransition, outTransition } = getTransition(transition);
	const attrs = $derived({
		id: ctx.uid('content'),
		'data-accordioncontent': '',
		'data-active': active || undefined,
		class: classProp(klass, { active })
	} as const);
</script>

{#if inTransition && outTransition && active}
	{@const { config: inConf, transition: inFn } = inTransition}
	{@const { config: outConf, transition: outFn } = outTransition}
	<div bind:this={self} use:useActions={use} in:inFn={inConf} out:outFn={outConf} {...attrs} {...props}>
		{@render children({ active })}
	</div>
{:else if active}
	<div bind:this={self} use:useActions={use} {...attrs} {...props}>
		{@render children({ active })}
	</div>
{/if}
