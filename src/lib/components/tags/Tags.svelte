<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { Element, parseId } from '$lib/internals/index.js';
	import { createTagsRootContext } from './state.svelte.js';

	import type { TagsProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		custom,
		ref = $bindable(),
		value = $bindable([]),
		blacklist = [],
		whitelist = [],
		disabled = $bindable(false),
		max = 0,
		...props
	}: TagsProps<typeof ctx.attrs, typeof ctx.state> = $props();

	let ctx = createTagsRootContext({
		id,
		value: stateValue(
			() => value,
			(v) => (value = v)
		),
		blacklist: stateValue(() => blacklist),
		whitelist: stateValue(() => whitelist),
		disabled: stateValue(() => disabled),
		max: stateValue(() => max)
	});
</script>

<Element bind:ref {children} {custom} {ctx} {...props} />
