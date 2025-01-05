<script lang="ts">
	import { createAccordionItemContext } from './main.svelte.js';
	import { stateValue, Element } from '$internal';

	import type { AccordionItemProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		disabled = $bindable(false),
		transition,
		as = 'div',
		value,
		...props
	}: AccordionItemProps = $props();

	const ctx = createAccordionItemContext({
		value: stateValue(() => value),
		disabled: stateValue(() => disabled)
	});
</script>

<Element {transition} {as} {klass} bind:self {use} state={ctx.state} {children} {...ctx.attrs} {...props} />
