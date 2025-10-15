<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { Element, parseId } from '$lib/internals/index.js';
	import { createAccordionRootContext } from './state.svelte.js';

	import type { AccordionProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		custom,
		ref = $bindable(),
		value = $bindable(''),
		onChange,
		...props
	}: AccordionProps<typeof ctx.attrs, typeof ctx.state> = $props();

	let ctx = createAccordionRootContext({
		id,
		value: stateValue(
			() => value,
			(v) => {
				value = v;
				onChange?.(v);
			}
		)
	});
</script>

<Element bind:ref {children} {custom} {ctx} {...props} />
