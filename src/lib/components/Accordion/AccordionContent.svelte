<script lang="ts">
	import { context } from './Accordion.svelte';
	import { useActions, getTransition, classProp } from '$lib/internal/index.js';
	import { getContext } from 'svelte';
	import type { AccordionContentProps } from './types.js';

	let { children, class: klass, use = [], self = $bindable(), transition, ...props }: AccordionContentProps = $props();

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
