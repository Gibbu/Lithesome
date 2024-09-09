<script lang="ts">
	import { useActions, classProp, stateValue } from '$internal';
	import type { MenuItemProps } from './types.js';
	import { useMenuItem } from './main.svelte.js';

	let {
		children,
		class: klass,
		use = [],
		disabled = $bindable(false),
		self = $bindable(),
		href,
		onClick,
		onMouseover,
		onFocus,
		...props
	}: MenuItemProps = $props();

	const ctx = useMenuItem({
		disabled: stateValue(() => disabled)
	});
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	bind:this={self}
	use:useActions={use}
	class={classProp(klass, ctx.state)}
	{...ctx.attrs}
	{...props}
>
	{@render children(ctx.state)}
</svelte:element>
