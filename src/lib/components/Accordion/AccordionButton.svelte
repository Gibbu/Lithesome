<script lang="ts">
	import { useAccordionButton } from './main.svelte.js';
	import { Element } from '$internal';
	import type { AccordionButtonProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		as = 'button',
		transition,
		onClick,
		...props
	}: AccordionButtonProps = $props();

	const ctx = useAccordionButton({
		onClick
	});
</script>

<Element {transition} {as} {klass} bind:self {use} state={ctx.state} {children} {...ctx.attrs} {...props} />
