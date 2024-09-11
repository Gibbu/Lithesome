<script lang="ts">
	import { useActions, classProp, stateValue } from '$internal';
	import { useSelectOption } from './main.svelte.js';
	import type { SelectOptionProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		value,
		label,
		self = $bindable(),
		disabled = $bindable(false),
		onClick,
		onMouseover,
		...props
	}: SelectOptionProps = $props();

	const ctx = useSelectOption(
		{
			disabled: stateValue(() => disabled),
			value: stateValue(() => value),
			label: stateValue(() => label || self?.textContent?.trim() || '')
		},
		{
			onClick,
			onMouseover
		}
	);
</script>

<button bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props}>
	{@render children(ctx.state)}
</button>
