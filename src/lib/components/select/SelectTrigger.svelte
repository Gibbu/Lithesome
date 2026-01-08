<script lang="ts">
	import { Element, parseId, stateValue } from '$lib/internals/index.js';
	import { useSelectTrigger } from './state.svelte.js';

	import type { SelectTriggerProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		custom,
		ref = $bindable(),
		...props
	}: SelectTriggerProps<typeof ctx.props> = $props();

	let ctx = useSelectTrigger({
		id: stateValue(() => id),
		ref: stateValue(() => ref!)
	});
</script>

<Element bind:ref {children} {custom} {ctx} as="button" {...props} />
