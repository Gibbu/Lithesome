<script lang="ts">
	import { Element, parseId } from '$lib/internals/index.js';
	import { useMenuSubTrigger } from './state.svelte.js';

	import type { MenuTriggerProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		custom,
		ref = $bindable(),
		...props
	}: MenuTriggerProps<typeof ctx.props, typeof ctx.state> = $props();

	let ctx = useMenuSubTrigger({ id });
</script>

<Element bind:ref {children} {custom} {ctx} as="button" {...props} />
