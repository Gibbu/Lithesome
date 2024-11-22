<script lang="ts">
	import { stateValue } from '$internal';
	import { createRootContext } from './main.svelte.js';
	import type { ComboboxProps } from './types.js';

	let {
		children,
		value = $bindable(),
		label = $bindable(),
		touched = $bindable(false),
		disabled = $bindable(false),
		visible = $bindable(true),
		controlled,
		onChange
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
			() => label || '',
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

{@render children?.(ctx.state)}
