<script lang="ts">
	import { stateValue, Element } from '$internal';
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
		as = 'div',
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

<Element {as} {klass} bind:self {use} state={ctx.state} {children} {...ctx.attrs} {...props} />
