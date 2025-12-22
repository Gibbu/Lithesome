<script lang="ts">
	import { Element, parseId, stateValue } from '$lib/internals/index.js';
	import { useHovercardArrow } from './state.svelte.js';

	import type { HovercardArrowProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		custom,
		ref = $bindable(),
		...props
	}: HovercardArrowProps<typeof ctx.props> = $props();

	let ctx = useHovercardArrow({
		id: stateValue(() => id),
		ref: stateValue(() => ref!)
	});
</script>

<Element bind:ref {children} {custom} {ctx} as="button" {...props} />
