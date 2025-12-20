<script lang="ts">
	import { Element, parseId, stateValue } from '$lib/internals/index.js';
	import { useHovercardTrigger } from './state.svelte.js';

	import type { HovercardTriggerProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		custom,
		ref = $bindable(),
		...props
	}: HovercardTriggerProps<typeof ctx.props> = $props();

	let ctx = useHovercardTrigger({
		id,
		ref: stateValue(() => ref!)
	});
</script>

<Element bind:ref {children} {custom} {ctx} as="button" {...props} />
