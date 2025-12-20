<script lang="ts">
	import { Element, parseId } from '$lib/internals/index.js';
	import { useAccordionContent } from './state.svelte.js';

	import type { AccordionContentProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		custom,
		ref = $bindable(),
		...props
	}: AccordionContentProps<typeof ctx.props, typeof ctx.state> = $props();

	let ctx = useAccordionContent({ id });
</script>

<Element bind:ref {children} {custom} {ctx} visible={ctx._item.Active} {...props} />
