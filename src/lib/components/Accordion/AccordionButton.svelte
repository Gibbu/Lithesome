<script lang="ts">
	import { useAccordionButton } from './main.svelte.js';
	import { useActions, classProp } from '$internal';
	import type { AccordionButtonProps } from './types.js';

	let { children, class: klass, use = [], self = $bindable(), onClick, ...props }: AccordionButtonProps = $props();

	const ctx = useAccordionButton({
		onClick
	});
</script>

<button
	type="button"
	bind:this={self}
	use:useActions={use}
	class={classProp(klass, ctx.state)}
	{...ctx.attrs}
	{...props}
>
	{@render children?.(ctx.state)}
</button>
