<script lang="ts">
	import { Element } from '$internal';
	import { usePortal, useTrap } from '$lib/index.js';
	import { useModalContent } from './main.svelte.js';
	import type { ModalContentProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		as = 'div',
		transition,
		...props
	}: ModalContentProps = $props();

	const ctx = useModalContent();
</script>

<Element
	visible={ctx._root.$visible.val}
	{transition}
	{as}
	{klass}
	bind:self
	use={[[useTrap, { allowOutsideClick: true }], [usePortal, ctx._root.$portalTarget.val], ...use]}
	{children}
	{...ctx.attrs}
	{...props}
/>
