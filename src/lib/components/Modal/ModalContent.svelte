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
		transition,
		as = 'div',
		...props
	}: ModalContentProps = $props();

	const ctx = useModalContent();
</script>

<Element
	visible={ctx.root.$visible.val}
	{as}
	{klass}
	bind:self
	use={[[useTrap, { allowOutsideClick: true }], [usePortal, ctx.root.$portalTarget.val], ...use]}
	{children}
	{transition}
	{...ctx.attrs}
	{...props}
/>
