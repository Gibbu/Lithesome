<script lang="ts">
	import { useActions, classProp } from '$internal';
	import type { AccordionHeadingProps } from './types.js';

	let { children, class: klass, use = [], level = 3, self = $bindable(), ...props }: AccordionHeadingProps = $props();
</script>

<div
	bind:this={self}
	use:useActions={use}
	class={classProp(klass)}
	role="heading"
	aria-level={level}
	data-accordionheading=""
	{...props}
>
	{@render children({})}
</div>
