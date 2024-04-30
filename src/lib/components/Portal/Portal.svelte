<script lang="ts">
	import { useActions, classProp } from '$lib/internal/index.js';
	import { usePortal } from '$lib/index.js';
	import type { PortalProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		self = $bindable(),
		target = $bindable('body'),
		...props
	}: PortalProps = $props();
</script>

<div bind:this={self} use:useActions={use} use:usePortal={target} class={classProp(klass)} data-portal="" {...props}>
	{@render children({})}
</div>
