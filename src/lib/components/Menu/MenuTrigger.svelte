<script lang="ts">
	import { useActions, classProp } from '$internal';
	import { useMenuTrigger } from './main.svelte.js';
	import type { MenuTriggerProps } from './types.js';

	let { children, class: klass, use = [], self = $bindable(), as = 'div', ...props }: MenuTriggerProps = $props();

	const ctx = useMenuTrigger();

	$effect(() => {
		if (self) ctx.root.registerTrigger(self);
	});
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} data-menutrigger="" {...props}>
	{@render children?.(ctx.state)}
</div>
