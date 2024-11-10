<script lang="ts">
	import { useActions, classProp, stateValue } from '$internal';
	import { createRootContext } from './main.svelte.js';
	import type { SelectProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		value = $bindable(),
		visible = $bindable(true),
		self = $bindable(),
		onChange,
		controlled = false,
		...props
	}: SelectProps = $props();

	const multiple = Array.isArray(value);
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
		multiple: stateValue(() => multiple),
		controlled: stateValue(() => controlled)
	});
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props}>
	{@render children?.(ctx.state)}
</div>
