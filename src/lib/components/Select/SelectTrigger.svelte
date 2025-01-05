<script lang="ts">
	import { Element } from '$internal';
	import { useSelectTrigger } from './main.svelte.js';
	import type { SelectTriggerProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		transition,
		as = 'div',
		...props
	}: SelectTriggerProps = $props();

	const ctx = useSelectTrigger();

	$effect(() => {
		if (self) ctx._root.registerTrigger(self);
	});
</script>

<Element {transition} {as} {klass} bind:self {use} state={ctx.state} {children} {...ctx.attrs} {...props} />
