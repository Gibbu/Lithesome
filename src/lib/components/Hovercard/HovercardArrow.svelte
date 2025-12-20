<script lang="ts">
	import { Element } from '$lib/internals/index.js';
	import { useHovercardArrow } from './state.svelte.js';

	import type { HovercardArrowProps } from '$lib/types/index.js';

	let { children, custom, ref = $bindable(), ...props }: HovercardArrowProps<typeof ctx.props> = $props();

	let ctx = useHovercardArrow();
</script>

<Element bind:ref {children} {custom} {ctx} as="button" {...props} />
