<script lang="ts">
	import { useActions, classProp, stateValue } from '$internal';
	import { createRootContext } from './main.svelte.js';
	import type { PinProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		self = $bindable(),
		value = $bindable([]),
		disabled = $bindable(false),
		type = $bindable('text'),
		placeholder = '○',
		onChange,
		onFilled,
		...props
	}: PinProps = $props();

	const ctx = createRootContext({
		value: stateValue(() => value),
		disabled: stateValue(() => disabled),
		type: stateValue(() => type),
		placeholder: stateValue(() => placeholder)
	});

	$effect(() => {
		if (ctx.Filled) onFilled?.(ctx.TransformedValue);
	});
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props}>
	{@render children(ctx.state)}
</div>
