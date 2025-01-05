<script lang="ts">
	import { Element, stateValue } from '$internal';
	import { useTreeGroup } from './main.svelte.js';
	import type { TreeGroupProps } from './types.js';

	let {
		children,
		class: klass,
		self = $bindable(),
		use = [],
		item,
		as = 'ul',
		transition,
		active = $bindable(false),
		...props
	}: TreeGroupProps = $props();

	const ctx = useTreeGroup({
		active: stateValue(
			() => active,
			(v) => (active = v)
		)
	});
</script>

<Element
	visible={active}
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
