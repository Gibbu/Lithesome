<script lang="ts">
	import { Element, parseId, stateValue } from '$lib/internals/index.js';
	import { useTooltipArrow } from './state.svelte.js';

	import type { TooltipArrowProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		custom,
		ref = $bindable(),
		...props
	}: TooltipArrowProps<typeof ctx.props> = $props();

	let ctx = useTooltipArrow({
		id: stateValue(() => id),
		ref: stateValue(() => ref!)
	});
</script>

<Element bind:ref {children} {custom} {ctx} as="button" {...props} />
