<script lang="ts">
	import { useAccordionContent } from './main.svelte.js';
	import { useActions, getTransition, classProp } from '$internal';
	import type { AccordionContentProps } from './types.js';

	let { children, class: klass, use = [], self = $bindable(), transition, ...props }: AccordionContentProps = $props();

	const ctx = useAccordionContent();

	const { inTransition, outTransition } = getTransition(transition);
	const attrs = $derived({
		...ctx.attrs,
		class: classProp(klass)
	} as const);
</script>

{#if inTransition && outTransition && ctx.item.Active}
	{@const { config: inConf, transition: inFn } = inTransition}
	{@const { config: outConf, transition: outFn } = outTransition}
	<div bind:this={self} use:useActions={use} in:inFn={inConf} out:outFn={outConf} {...attrs} {...props}>
		{@render children?.({})}
	</div>
{:else if ctx.item.Active}
	<div bind:this={self} use:useActions={use} {...attrs} {...props}>
		{@render children?.({})}
	</div>
{/if}
