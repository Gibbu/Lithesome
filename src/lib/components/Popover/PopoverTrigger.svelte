<script lang="ts">
	import { useActions, classProp } from '$internal';
	import { usePopoverTrigger } from './main.svelte.js';
	import type { PopoverTriggerProps } from './types.js';

	let { children, class: klass, use = [], self = $bindable(), ...props }: PopoverTriggerProps = $props();

	const ctx = usePopoverTrigger();

	$effect(() => {
		if (self) ctx.registerTrigger(self);
	});
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props}>
	{@render children?.(ctx.state)}
</div>
