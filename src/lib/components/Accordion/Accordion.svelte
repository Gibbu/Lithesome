<script lang="ts">
	import { useActions, classProp, stateValue } from '$internal';
	import { createAccordionRootContext } from './main.svelte.js';
	import type { AccordionProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		value = $bindable([]),
		self = $bindable(),
		single = $bindable(false),
		onChange,
		...props
	}: AccordionProps = $props();

	const ctx = createAccordionRootContext({
		single: stateValue(() => single),
		value: stateValue(
			() => value,
			(v) => {
				value = v;
				onChange?.(v);
			}
		)
	});
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props}>
	{@render children?.(ctx.state)}
</div>
