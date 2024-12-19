<script lang="ts">
	import { stateValue } from '$internal';
	import { createCheckboxRootContext } from './main.svelte.js';

	import type { CheckboxProps } from './types.js';

	let {
		children,
		checked = $bindable(false),
		disabled = $bindable(false),
		required = $bindable(false)
	}: CheckboxProps = $props();

	const ctx = createCheckboxRootContext({
		checked: stateValue(() => checked),
		disabled: stateValue(() => disabled),
		required: stateValue(() => required)
	});
</script>

{@render children?.(ctx.state)}
