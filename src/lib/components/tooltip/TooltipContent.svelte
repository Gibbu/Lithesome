<script lang="ts">
	import { Element, parseId, stateValue } from '$lib/internals/index.js';
	import { useTooltipContent } from './state.svelte.js';

	import type { TooltipContentProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		custom,
		ref = $bindable(),
		...props
	}: TooltipContentProps<typeof ctx.props> = $props();

	let ctx = useTooltipContent({
		id: stateValue(() => id),
		ref: stateValue(() => ref!)
	});
</script>

<Element bind:ref {children} {custom} visible={ctx._root.$$.visible.val} {ctx} {...props} />
