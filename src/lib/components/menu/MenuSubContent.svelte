<script lang="ts">
	import { Element, parseId, stateValue } from '$lib/internals/index.js';
	import { useMenuSubContent } from './state.svelte.js';

	import type { MenuSubContentProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		custom,
		ref = $bindable(),
		...props
	}: MenuSubContentProps<typeof ctx.props, typeof ctx.state> = $props();

	let ctx = useMenuSubContent({
		id: stateValue(() => id),
		ref: stateValue(() => ref!)
	});
</script>

<Element bind:ref {children} {custom} visible={ctx._sub.$$.visible.val} {ctx} {...props} />
