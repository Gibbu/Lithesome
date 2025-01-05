<script lang="ts">
	import { Element } from '$internal';
	import { usePortal } from '$lib/index.js';
	import { toasts } from './main.svelte.js';
	import type { ToasterProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		self = $bindable(),
		portalTarget = 'body',
		as = 'div',
		transition,
		...props
	}: ToasterProps = $props();
</script>

<Element
	{transition}
	{as}
	{klass}
	bind:self
	use={[[usePortal, portalTarget], ...use]}
	state={toasts}
	{children}
	data-toaster=""
	{...props}
/>
