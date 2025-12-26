<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { Element, parseId } from '$lib/internals/index.js';
	import { createAccordionItemContext } from './state.svelte.js';

	import type { AccordionItemProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		ref = $bindable(),
		disabled = $bindable(false),
		value,
		children,
		custom,
		...props
	}: AccordionItemProps<typeof ctx.props, typeof ctx.state> = $props();

	let ctx = createAccordionItemContext({
		id: stateValue(() => id),
		ref: stateValue(() => ref!),
		value: stateValue(() => value),
		disabled: stateValue(() => disabled)
	});
</script>

<Element bind:ref {children} {custom} {ctx} {...props} />
