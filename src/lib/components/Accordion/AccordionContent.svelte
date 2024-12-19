<script lang="ts">
	import { useAccordionContent } from './main.svelte.js';
	import { Element } from '$internal';

	import type { AccordionContentProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		transition,
		as = 'div',
		...props
	}: AccordionContentProps = $props();

	const ctx = useAccordionContent();
</script>

<Element
	{as}
	{klass}
	bind:self
	{use}
	state={ctx.state}
	{children}
	{transition}
	visible={ctx.item.Active}
	{...ctx.attrs}
	{...props}
/>
