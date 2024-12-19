<script lang="ts">
	import { Element } from '$internal';
	import { usePopoverTrigger } from './main.svelte.js';
	import type { PopoverTriggerProps } from './types.js';

	let { children, class: klass, use = [], self = $bindable(), as = 'div', ...props }: PopoverTriggerProps = $props();

	const ctx = usePopoverTrigger();

	$effect(() => {
		if (self) ctx.root.registerTrigger(self);
	});
</script>

<Element {as} {klass} bind:self {use} state={ctx.state} {children} {...ctx.attrs} {...props} />
