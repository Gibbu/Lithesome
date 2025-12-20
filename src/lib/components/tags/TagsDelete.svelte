<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { Element, parseId } from '$lib/internals/index.js';
	import { useTagsDelete } from './state.svelte.js';

	import type { TagsDeleteProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		custom,
		ref = $bindable(),
		value,
		...props
	}: TagsDeleteProps<typeof ctx.props> = $props();

	let ctx = useTagsDelete({
		id,
		value: stateValue(() => value)
	});
</script>

<Element bind:ref {children} {custom} {ctx} {...props} />
