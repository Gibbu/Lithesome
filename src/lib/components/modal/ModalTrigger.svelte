<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { Element, parseId } from '$lib/internals/index.js';
	import { useModalTrigger } from './state.svelte.js';

	import type { ModalTriggerProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		ref = $bindable(),
		children,
		custom,
		...props
	}: ModalTriggerProps<typeof ctx.props> = $props();

	let ctx = useModalTrigger({
		id: stateValue(() => id),
		ref: stateValue(() => ref!)
	});
</script>

<Element bind:ref as="button" {children} {custom} {ctx} {...props} />
