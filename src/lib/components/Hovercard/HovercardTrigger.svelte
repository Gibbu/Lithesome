<script lang="ts">
	import { Element } from '$internal';
	import { useHovercardTrigger } from './main.svelte.js';

	import type { HovercardTriggerProps } from './types.js';

	let { children, class: klass, use = [], self = $bindable(), as = 'div', ...props }: HovercardTriggerProps = $props();

	const ctx = useHovercardTrigger();

	$effect(() => {
		if (self) ctx.root.registerTrigger(self);
	});
</script>

<Element {as} {klass} bind:self {use} state={ctx.state} {children} {...ctx.attrs} {...props} />
