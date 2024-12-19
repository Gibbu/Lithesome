<script lang="ts">
	import { useAccordionHeading } from './main.svelte.js';
	import { Element } from '$internal';
	import type { AccordionHeadingProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		level = 3,
		self = $bindable(),
		as = 'div',
		...props
	}: AccordionHeadingProps = $props();

	const ctx = useAccordionHeading({ level });
</script>

<Element {as} {klass} bind:self {use} {children} {...ctx.attrs} {...props} />
