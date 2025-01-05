<script lang="ts">
	import { stateValue, Element } from '$internal';
	import type { TabsProps } from './types.js';
	import { createRootContext } from './main.svelte.js';

	let {
		children,
		use = [],
		class: klass,
		self = $bindable(),
		orientation = 'horizontal',
		value = $bindable(''),
		as = 'div',
		transition,
		...props
	}: TabsProps = $props();

	const ctx = createRootContext({
		value: stateValue(
			() => value,
			(v) => (value = v)
		),
		orientation: stateValue(() => orientation)
	});
</script>

<Element {transition} {as} {klass} bind:self {use} state={ctx.state} {children} {...ctx.attrs} {...props} />
