<script lang="ts">
	import { Element } from '$internal';
	import type { HovercardTriggerProps } from './types.js';
	import { useHovercardTrigger } from './main.svelte.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		as = 'div',
		transition,
		...props
	}: HovercardTriggerProps = $props();

	const ctx = useHovercardTrigger();

	$effect(() => {
		if (self) ctx._root.registerTrigger(self);
	});
</script>

<Element {transition} {as} {klass} bind:self {use} state={ctx.state} {children} {...ctx.attrs} {...props} />
