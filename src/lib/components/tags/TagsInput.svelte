<script lang="ts">
	import { Element, parseId, stateValue } from '$lib/internals/index.js';
	import { useTagsInput } from './state.svelte.js';

	import type { TagsInputProps } from '$lib/types/index.js';

	const uid = $props.id();

	let { id = parseId(uid), ref = $bindable(), ...props }: TagsInputProps<typeof ctx.state> = $props();

	let ctx = useTagsInput({
		id: stateValue(() => id),
		ref: stateValue(() => ref!)
	});
</script>

<Element as="input" bind:ref {ctx} {...props} />
