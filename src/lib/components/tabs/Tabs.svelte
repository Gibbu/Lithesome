<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { Element, parseId } from '$lib/internals/index.js';
	import { createTabsRootContext } from './state.svelte.js';

	import type { TabsProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		custom,
		value = $bindable(''),
		orientation = $bindable('horizontal'),
		ref = $bindable(),
		...props
	}: TabsProps<typeof ctx.props, typeof ctx.state> = $props();

	let ctx = createTabsRootContext({
		id,
		ref: stateValue(() => ref!),
		value: stateValue(
			() => value,
			(v) => (value = v)
		),
		orientation: stateValue(() => orientation)
	});
</script>

<Element bind:ref {children} {custom} {ctx} {...props} />
