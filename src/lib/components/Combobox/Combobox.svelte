<script lang="ts">
	import { useActions, classProp, stateValue } from '$internal';
	import { createRootContext } from './main.svelte.js';
	import type { ComboboxProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		value = $bindable(),
		label = $bindable(),
		touched = $bindable(false),
		disabled = $bindable(false),
		visible = $bindable(true),
		controlled = false,
		self = $bindable(),
		onChange,
		...props
	}: ComboboxProps = $props();

	const ctx = createRootContext({
		value: stateValue(
			() => value,
			(v) => {
				value = v;
				onChange?.({ value: v });
			}
		),
		disabled: stateValue(() => disabled),
		label: stateValue(
			() => label || self?.textContent?.trim() || '',
			(v) => {
				label = v;
				onChange?.({ label: v });
			}
		),
		multiple: stateValue(() => Array.isArray(value)),
		touched: stateValue(
			() => touched,
			(v) => (touched = v)
		),
		visible: stateValue(
			() => visible,
			(v) => (visible = v)
		),
		controlled: stateValue(() => controlled)
	});
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props}>
	{@render children?.(ctx.state)}
</div>
