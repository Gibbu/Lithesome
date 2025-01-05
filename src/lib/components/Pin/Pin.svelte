<script lang="ts">
	import { stateValue, Element } from '$internal';
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
		as = 'div',
		transition,
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

<Element {transition} {as} {klass} bind:self {use} state={ctx.state} {children} {...ctx.attrs} {...props} />
