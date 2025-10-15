<script lang="ts">
	import { Element } from '$lib/internals/index.js';
	import { useTooltipArrow } from './state.svelte.js';

	import type { TooltipArrowProps } from '$lib/types/index.js';

	let { children, custom, ref = $bindable(), ...props }: TooltipArrowProps<typeof ctx.attrs> = $props();

	let ctx = useTooltipArrow();
</script>

<Element bind:ref {children} {custom} {ctx} as="button" {...props} />
