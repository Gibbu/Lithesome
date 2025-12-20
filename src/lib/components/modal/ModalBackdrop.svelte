<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { Element, parseId } from '$lib/internals/index.js';
	import { useModalBackdrop } from './state.svelte.js';

	import type { ModalBackdropProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		ref = $bindable(),
		children,
		custom,
		...props
	}: ModalBackdropProps<typeof ctx.props, typeof ctx.state> = $props();

	let ctx = useModalBackdrop({
		id,
		ref: stateValue(() => ref!)
	});
</script>

<Element bind:ref {children} {custom} visible={ctx._root.$visible.val} {ctx} {...props} />
