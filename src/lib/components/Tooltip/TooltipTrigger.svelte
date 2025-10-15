<script lang="ts">
	import { Element } from '$lib/internals/index.js';
	import { useTooltipTrigger } from './state.svelte.js';

	import type { TooltipTriggerProps } from '$lib/types/index.js';

	let { children, custom, ref = $bindable(), ...props }: TooltipTriggerProps<typeof ctx.attrs> = $props();

	let ctx = useTooltipTrigger();
</script>

<Element bind:ref {children} {custom} {ctx} as="button" {...props} />
