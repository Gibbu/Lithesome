<script lang="ts">
	import { useActions, classProp, stateValue } from '$internal';
	import type { AccordionProps } from './types.js';
	import { createAccordionRootContext } from './main.svelte.js';

	let {
		children,
		use = [],
		class: klass,
		value = $bindable(),
		self = $bindable(),
		single = $bindable(false),
		...props
	}: AccordionProps = $props();

	const ctx = createAccordionRootContext({
		single: stateValue(() => single),
		value: stateValue(() => value)
	});
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass)} {...ctx.attrs} {...props}>
	{@render children?.({})}
</div>
