<script lang="ts">
	import { Element } from '$internal';
	import { usePortal } from '$lib/actions/portal.js';
	import { useModalOverlay } from './main.svelte.js';
	import type { ModalOverlayProps } from './types.js';

	let { class: klass, use = [], self, transition, as = 'div', ...props }: ModalOverlayProps = $props();

	const ctx = useModalOverlay();
</script>

<Element
	visible={ctx._root.$visible.val}
	{transition}
	{as}
	{klass}
	bind:self
	use={[[usePortal, ctx._root.$portalTarget.val], ...use]}
	{...ctx.attrs}
	{...props}
/>
