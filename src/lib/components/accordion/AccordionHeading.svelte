<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { Element, parseId } from '$lib/internals/index.js';
	import { useAccordionHeading } from './state.svelte.js';

	import type { AccordionHeadingProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		custom,
		ref = $bindable(),
		level = 3,
		...props
	}: AccordionHeadingProps<typeof ctx.props, typeof ctx.state> = $props();

	let ctx = useAccordionHeading({
		id: stateValue(() => id),
		ref: stateValue(() => ref!),
		level: stateValue(() => level)
	});
</script>

<Element bind:ref {children} {custom} {ctx} {...props} />
