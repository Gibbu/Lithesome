<script lang="ts">
	import { Element, parseId, stateValue } from '$lib/internals/index.js';
	import { useMenuContent } from './state.svelte.js';

	import type { MenuContentProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		custom,
		ref = $bindable(),
		...props
	}: MenuContentProps<typeof ctx.props, typeof ctx.state> = $props();

	let ctx = useMenuContent({
		id,
		ref: stateValue(() => ref!)
	});
</script>

<Element bind:ref {children} {custom} visible={ctx._root.$visible.val} {ctx} {...props} />
