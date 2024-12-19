<script lang="ts">
	import { useActions, getTransition, classProp, Element } from '$internal';
	import { usePortal } from '$lib/actions/portal.js';
	import { useModalOverlay } from './main.svelte.js';
	import type { ModalOverlayProps } from './types.js';

	let { class: klass, use = [], self, transition, as = 'div', ...props }: ModalOverlayProps = $props();

	const ctx = useModalOverlay();
</script>

<Element
	visible={ctx.root.$visible.val}
	{as}
	{klass}
	bind:self
	use={[[usePortal, ctx.root.$portalTarget.val], ...use]}
	{transition}
	{...ctx.attrs}
	{...props}
/>
