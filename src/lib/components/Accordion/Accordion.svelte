<script lang="ts">
	import { useActions, classProp, stateValue } from '$internal';
	import type { AccordionProps } from './types.js';
	import { createAccordionRootContext } from './main.svelte.js';

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

<div bind:this={self} use:useActions={use} class={classProp(klass)} {...ctx.attrs} {...props}>
	{@render children?.({})}
</div>
