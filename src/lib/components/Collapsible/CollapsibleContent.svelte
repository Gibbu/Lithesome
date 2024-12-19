<script lang="ts">
	import { useCollapsibleContent } from './main.svelte.js';
	import { Element } from '$internal';

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
</script>

<Element
	visible={ctx.root.$visible.val}
	toggleable
	{as}
	{klass}
	bind:self
	{use}
	state={ctx.state}
	{children}
	{transition}
	{...ctx.attrs}
	{...props}
/>
