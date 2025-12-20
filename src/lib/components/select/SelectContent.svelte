<script lang="ts">
	import { Element, parseId, stateValue } from '$lib/internals/index.js';
	import { useSelectContent, useSelectDummyContent } from './state.svelte.js';

	import type { SelectContentProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		custom,
		ref = $bindable(),
		...props
	}: SelectContentProps<typeof ctx.props, typeof ctx.state> = $props();

	let ctx = useSelectContent({
		id,
		ref: stateValue(() => ref!)
	});

	let dummyCtx = useSelectDummyContent();
</script>

<Element bind:ref {children} {custom} visible={ctx._root.$visible.val} {ctx} {...props} />

<Element {children} visible={!ctx._root.mounted} ctx={dummyCtx} {...props} />
