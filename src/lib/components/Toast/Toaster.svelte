<script lang="ts">
	import { useActions, classProp } from '$internal';
	import { usePortal } from '$lib/index.js';
	import { toasts } from './context.svelte.js';
	import type { ToasterProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		self = $bindable(),
		portalTarget = 'body',
		...props
	}: ToasterProps = $props();
</script>

<div
	bind:this={self}
	use:useActions={use}
	use:usePortal={portalTarget}
	class={classProp(klass)}
	data-toaster=""
	{...props}
>
	{@render children(toasts)}
</div>
