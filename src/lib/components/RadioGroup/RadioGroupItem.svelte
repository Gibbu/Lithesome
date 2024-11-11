<script lang="ts">
	import { useActions, classProp, stateValue } from '$internal';
	import { useRadioItem } from './main.svelte.js';
	import type { RadioGroupItemProps } from './types.js';

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
	}: RadioGroupItemProps = $props();

	const ctx = useRadioItem(
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
