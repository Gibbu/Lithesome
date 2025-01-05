<script lang="ts">
	import { stateValue, Element } from '$internal';
	import { createRootContext } from './main.svelte.js';
	import type { RadioGroupProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		self = $bindable(),
		value = $bindable(''),
		as = 'div',
		transition,
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

<Element {transition} {as} {klass} bind:self {use} state={ctx.state} {children} {...ctx.attrs} {...props} />
