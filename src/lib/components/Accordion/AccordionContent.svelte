<script lang="ts">
	import { useAccordionContent } from './main.svelte.js';
	import { Element } from '$internal';
	import type { AccordionContentProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		as = 'div',
		transition,
		...props
	}: AccordionContentProps = $props();

	const ctx = useAccordionContent();
</script>

<Element
	visible={ctx._item.Active}
	{as}
	{transition}
	{klass}
	bind:self
	{use}
	state={ctx.state}
	{children}
	{...ctx.attrs}
	{...props}
/>
