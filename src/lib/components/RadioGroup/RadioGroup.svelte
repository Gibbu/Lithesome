<script lang="ts">
	import { Element, stateValue } from '$internal';
	import { createRootContext } from './main.svelte.js';

	import type { RadioGroupProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		self = $bindable(),
		value = $bindable(''),
		required = false,
		as = 'div',
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

<Element {as} {klass} bind:self {use} state={ctx.state} {children} {...ctx.attrs} {...props} />
