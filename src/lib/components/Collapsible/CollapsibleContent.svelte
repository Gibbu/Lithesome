<script lang="ts">
	import { useCollapsibleContent } from './main.svelte.js';
	import { useActions, getTransition, classProp, Element } from '$internal';
	import type { CollapsibleContentProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		transition,
		as = 'div',
		...props
	}: CollapsibleContentProps = $props();

	const ctx = useCollapsibleContent();

	const { inTransition, outTransition } = getTransition(transition);
	const attrs = $derived({
		...ctx.attrs,
		class: classProp(klass, ctx.state)
	} as const);
</script>

<Element
	visible={ctx._root.$visible.val}
	{transition}
	{as}
	{klass}
	bind:self
	{use}
	state={ctx.state}
	{children}
	{...ctx.attrs}
	{...props}
/>
