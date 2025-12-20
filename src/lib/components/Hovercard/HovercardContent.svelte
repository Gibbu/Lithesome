<script lang="ts">
	import { Element, parseId } from '$lib/internals/index.js';
	import { useHovercardContent } from './state.svelte.js';

	import type { HovercardContentProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		custom,
		ref = $bindable(),
		...props
	}: HovercardContentProps<typeof ctx.props, typeof ctx.state> = $props();

	let ctx = useHovercardContent({ id });
</script>

<Element bind:ref {children} {custom} visible={ctx._root.$visible.val} {ctx} {...props} />
