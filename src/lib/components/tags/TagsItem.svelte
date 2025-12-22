<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { Element, parseId } from '$lib/internals/index.js';
	import { useTagsItem } from './state.svelte.js';

	import type { TagsItemProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		custom,
		ref = $bindable(),
		value,
		...props
	}: TagsItemProps<typeof ctx.props, typeof ctx.state> = $props();

	let ctx = useTagsItem({
		id: stateValue(() => id),
		ref: stateValue(() => ref!),
		value: stateValue(() => value)
	});
</script>

<Element bind:ref {children} {custom} {ctx} {...props} />
