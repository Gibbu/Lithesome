<script lang="ts">
	import { useCollapsibleContent } from './main.svelte.js';
	import { useActions, getTransition, classProp } from '$internal';
	import type { CollapsibleContentProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		transition,
		...props
	}: CollapsibleContentProps = $props();

	const ctx = useCollapsibleContent();

	const { inTransition, outTransition } = getTransition(transition);
	const attrs = $derived({
		...ctx.attrs,
		class: classProp(klass, ctx.state)
	} as const);
</script>

{#if inTransition && outTransition && ctx.root.$visible.val}
	{@const { config: inConf, transition: inFn } = inTransition}
	{@const { config: outConf, transition: outFn } = outTransition}
	<div bind:this={self} use:useActions={use} in:inFn={inConf} out:outFn={outConf} {...attrs} {...props}>
		{@render children?.(ctx.state)}
	</div>
{:else if ctx.root.$visible.val}
	<div bind:this={self} use:useActions={use} {...attrs} {...props}>
		{@render children?.(ctx.state)}
	</div>
{/if}
