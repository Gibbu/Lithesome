<script lang="ts">
	import { Element, parseId, stateValue } from '$lib/internals/index.js';
	import { useTabsContent } from './state.svelte.js';

	import type { TabsContentProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		custom,
		ref = $bindable(),
		value = $bindable(''),
		...props
	}: TabsContentProps<typeof ctx.attrs, typeof ctx.state> = $props();

	let ctx = useTabsContent({
		id,
		value: stateValue(() => value)
	});
</script>

<Element bind:ref {children} {custom} {ctx} {...props} />
