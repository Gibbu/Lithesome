<script lang="ts">
	import { useActions, classProp } from '$internal';
	import type { HovercardTriggerProps } from './types.js';
	import { useHovercardTrigger } from './main.svelte.js';

	let { children, class: klass, use = [], self = $bindable(), ...props }: HovercardTriggerProps = $props();

	const ctx = useHovercardTrigger();

	$effect(() => {
		if (self) ctx.registerTrigger(self);
	});
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props}>
	{@render children(ctx.state)}
</div>
