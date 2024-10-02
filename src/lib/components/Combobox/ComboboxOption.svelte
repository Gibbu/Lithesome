<script lang="ts">
	import { useActions, classProp, stateValue } from '$internal';
	import { useComboboxOption } from './main.svelte.js';
	import type { ComboboxElement, ComboboxOptionProps } from './types.js';

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
	}: ComboboxOptionProps = $props();
	let optionEl: ComboboxElement;

	const ctx = useComboboxOption(
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

<button
	bind:this={self}
	bind:this={optionEl}
	use:useActions={use}
	class={classProp(klass, ctx.state)}
	{...ctx.attrs}
	{...props}
>
	{@render children?.(ctx.state)}
</button>
