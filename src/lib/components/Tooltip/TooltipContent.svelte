<script lang="ts">
	import { Element } from '$lib/internals/index.js';
	import { useTooltipContent } from './state.svelte.js';

	import type { TooltipContentProps } from '$lib/types/index.js';

	let {
		children,
		custom,
		ref = $bindable(),
		...props
	}: TooltipContentProps<typeof ctx.props, typeof ctx.state> = $props();

	let ctx = useTooltipContent();
</script>

<Element bind:ref {children} {custom} visible={ctx._root.$visible.val} {ctx} {...props} />
