<script lang="ts">
	import { Element, parseId, stateValue } from '$lib/internals/index.js';
	import { useTabsList } from './state.svelte.js';

	import type { TabsListProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		custom,
		ref = $bindable(),
		...props
	}: TabsListProps<typeof ctx.props, typeof ctx.state> = $props();

	let ctx = useTabsList({
		id: stateValue(() => id),
		ref: stateValue(() => ref!)
	});
</script>

<Element bind:ref {children} {custom} {ctx} {...props} />
