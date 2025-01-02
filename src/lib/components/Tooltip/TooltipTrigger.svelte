<script lang="ts">
	import { useActions, classProp } from '$internal';
	import { useTooltipTrigger } from './main.svelte.js';
	import type { TooltipTriggerProps } from './types.js';

	let { children, class: klass, use = [], self = $bindable(), ...props }: TooltipTriggerProps = $props();

	const ctx = useTooltipTrigger();

	$effect(() => {
		if (self) ctx._root.registerTrigger(self);
	});
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props}>
	{@render children?.(ctx.state)}
</div>
