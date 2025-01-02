<script lang="ts">
	import { useActions, classProp } from '$internal';
	import { useSelectTrigger } from './main.svelte.js';
	import type { SelectTriggerProps } from './types.js';

	let { children, class: klass, use = [], self = $bindable(), ...props }: SelectTriggerProps = $props();

	const ctx = useSelectTrigger();

	$effect(() => {
		if (self) ctx._root.registerTrigger(self);
	});
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...props} {...ctx.attrs}>
	{@render children?.(ctx.state)}
</div>
