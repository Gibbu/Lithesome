<script lang="ts">
	import { useActions, classProp, stateValue, Element } from '$internal';
	import type { MenuItemProps } from './types.js';
	import { useMenuItem } from './main.svelte.js';

	let {
		children,
		class: klass,
		use = [],
		disabled = $bindable(false),
		self = $bindable(),
		href,
		transition,
		as = 'button',
		onClick,
		onMouseover,
		...props
	}: MenuItemProps = $props();

	const ctx = useMenuItem(
		{
			disabled: stateValue(() => disabled)
		},
		{
			onClick,
			onMouseover
		}
	);
</script>

<Element
	bind:self
	{transition}
	as={href ? 'a' : as}
	href={href || undefined}
	{klass}
	{use}
	state={ctx.state}
	{children}
	{...ctx.attrs}
	{...props}
/>
