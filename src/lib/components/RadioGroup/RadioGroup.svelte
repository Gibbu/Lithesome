<script lang="ts">
	import { useActions, classProp, stateValue } from '$internal';
	import { createRootContext } from './main.svelte.js';
	import type { RadioGroupProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		self = $bindable(),
		value = $bindable(''),
		required = false,
		onChange,
		...props
	}: RadioGroupProps = $props();

	const ctx = createRootContext({
		value: stateValue(
			() => value,
			(v) => {
				value = v;
				onChange?.(v);
			}
		),
		required: stateValue(() => required)
	});
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props}>
	{@render children?.(ctx.state)}
</div>
