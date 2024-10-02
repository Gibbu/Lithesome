<script lang="ts">
	import { useActions, classProp, stateValue } from '$internal';
	import { useTabsButton } from './main.svelte.js';
	import type { TabsButtonProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		disabled = $bindable(false),
		value,
		onClick,
		onKeydown,
		...props
	}: TabsButtonProps = $props();

	const ctx = useTabsButton(
		{
			value: stateValue(() => value),
			disabled: stateValue(() => disabled)
		},
		{
			onClick,
			onKeydown
		}
	);
</script>

<button bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props}>
	{@render children?.(ctx.state)}
</button>
