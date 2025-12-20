<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { Element, parseId } from '$lib/internals/index.js';
	import { useModalDescription } from './state.svelte.js';

	import type { ModalDescriptionProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		ref = $bindable(),
		children,
		custom,
		...props
	}: ModalDescriptionProps<typeof ctx.props, any> = $props();

	let ctx = useModalDescription({
		id,
		ref: stateValue(() => ref!)
	});
</script>

<Element bind:ref as="p" {children} {custom} visible={ctx._root.$visible.val} {ctx} {...props} />
