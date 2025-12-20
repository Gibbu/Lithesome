<script lang="ts">
	import { Element, parseId } from '$lib/internals/index.js';
	import { useMenuArrow } from './state.svelte.js';

	import type { MenuArrowProps } from '$lib/types/index.js';

	const uid = $props.id();

	let { id = parseId(uid), children, custom, ref = $bindable(), ...props }: MenuArrowProps<typeof ctx.props> = $props();

	let ctx = useMenuArrow({ id });
</script>

<Element bind:ref {children} {custom} {ctx} as="button" {...props} />
