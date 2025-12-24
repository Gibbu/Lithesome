<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { Element, parseId } from '$lib/internals/index.js';
	import { useDropzoneInput } from './state.svelte.js';

	import type { DropzoneInputProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		ref = $bindable(),
		children,
		custom,
		...props
	}: DropzoneInputProps<typeof ctx.props> = $props();

	let ctx = useDropzoneInput({
		id: stateValue(() => id),
		ref: stateValue(() => ref!)
	});
</script>

<Element bind:ref as="input" {ctx} {...props} />
