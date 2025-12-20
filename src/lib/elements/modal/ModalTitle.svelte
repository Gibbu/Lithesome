<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { Element, parseId } from '$lib/internals/index.js';
	import { useModalTitle } from './state.svelte.js';

	import type { ModalTitleProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		ref = $bindable(),
		children,
		custom,
		...props
	}: ModalTitleProps<typeof ctx.props, any> = $props();

	let ctx = useModalTitle({
		id,
		ref: stateValue(() => ref!)
	});
</script>

<Element bind:ref as="h2" {children} {custom} visible={ctx._root.$visible.val} {ctx} {...props} />
