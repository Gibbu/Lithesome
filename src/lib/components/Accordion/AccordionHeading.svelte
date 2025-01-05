<script lang="ts">
	import { useAccordionHeading } from './main.svelte.js';
	import { Element } from '$internal';
	import type { AccordionHeadingProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		as = 'div',
		level = 3,
		transition,
		self = $bindable(),
		...props
	}: AccordionHeadingProps = $props();

	const ctx = useAccordionHeading({ level });
</script>

<Element {transition} {as} {klass} bind:self {use} {children} {...ctx.attrs} {...props} />
