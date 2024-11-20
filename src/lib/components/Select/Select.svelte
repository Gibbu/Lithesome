<script lang="ts">
	import { stateValue } from '$internal';
	import { createRootContext } from './main.svelte.js';
	import type { SelectProps } from './types.js';

	let { children, value = $bindable(), visible = $bindable(true), onChange, controlled }: SelectProps = $props();

	const ctx = createRootContext({
		visible: stateValue(
			() => visible,
			(v) => (visible = v)
		),
		value: stateValue(
			() => value,
			(v) => {
				value = v;
				onChange?.(v);
			}
		),
		multiple: stateValue(() => Array.isArray(value)),
		controlled: stateValue(() => controlled)
	});
</script>

{@render children?.(ctx.state)}
