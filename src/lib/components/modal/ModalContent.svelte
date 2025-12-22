<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { Element, parseId } from '$lib/internals/index.js';
	import { useModalContent } from './state.svelte.js';

	import type { ModalContentProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		ref = $bindable(),
		children,
		custom,
		...props
	}: ModalContentProps<typeof ctx.props, typeof ctx.state> = $props();

	let ctx = useModalContent({
		id: stateValue(() => id),
		ref: stateValue(() => ref!)
	});
</script>

<Element bind:ref {children} {custom} visible={ctx._root.$$.visible.val} {ctx} {...props} />
