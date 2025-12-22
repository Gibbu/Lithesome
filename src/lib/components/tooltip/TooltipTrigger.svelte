<script lang="ts">
	import { Element, parseId, stateValue } from '$lib/internals/index.js';
	import { useTooltipTrigger } from './state.svelte.js';

	import type { TooltipTriggerProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		custom,
		ref = $bindable(),
		...props
	}: TooltipTriggerProps<typeof ctx.props> = $props();

	let ctx = useTooltipTrigger({
		id: stateValue(() => id),
		ref: stateValue(() => ref!)
	});
</script>

<Element bind:ref {children} {custom} {ctx} as="button" {...props} />
