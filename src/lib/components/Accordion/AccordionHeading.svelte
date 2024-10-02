<script lang="ts">
	import { useAccordionHeading } from './main.svelte.js';
	import { useActions, classProp } from '$internal';
	import type { AccordionHeadingProps } from './types.js';

	let { children, class: klass, use = [], level = 3, self = $bindable(), ...props }: AccordionHeadingProps = $props();

	const ctx = useAccordionHeading({ level });
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass)} {...ctx.attrs} {...props}>
	{@render children?.({})}
</div>
