<script lang="ts">
	import { Element } from '$internal';
	import { useTooltipTrigger } from './main.svelte.js';
	import type { TooltipTriggerProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		transition,
		as = 'div',
		...props
	}: TooltipTriggerProps = $props();

	const ctx = useTooltipTrigger();

	$effect(() => {
		if (self) ctx._root.registerTrigger(self);
	});
</script>

<Element {transition} {as} {klass} bind:self {use} state={ctx.state} {children} {...ctx.attrs} {...props} />
