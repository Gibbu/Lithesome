<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { Element, parseId } from '$lib/internals/index.js';
	import { useCheckboxLabel } from './state.svelte.js';

	import type { CheckboxLabelProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		ref = $bindable(),
		children,
		custom,
		...props
	}: CheckboxLabelProps<typeof ctx.props, typeof ctx.state> = $props();

	let ctx = useCheckboxLabel({
		id: stateValue(() => id),
		ref: stateValue(() => ref!)
	});
</script>

<Element bind:ref as="label" {children} {custom} {ctx} {...props} />
