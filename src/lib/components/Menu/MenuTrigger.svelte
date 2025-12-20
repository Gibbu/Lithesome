<script lang="ts">
	import { Element, parseId } from '$lib/internals/index.js';
	import { useMenuTrigger } from './state.svelte.js';

	import type { MenuTriggerProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		custom,
		ref = $bindable(),
		...props
	}: MenuTriggerProps<typeof ctx.props> = $props();

	let ctx = useMenuTrigger({ id });
</script>

<Element bind:ref {children} {custom} {ctx} as="button" {...props} />
