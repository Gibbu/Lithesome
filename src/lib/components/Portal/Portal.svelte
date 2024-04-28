<script lang="ts">
	import { useActions, classProp, portal } from '$lib/internal/index.js';
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

<div bind:this={self} use:useActions={use} use:portal={target} class={classProp(klass)} data-portal="" {...props}>
	{@render children({})}
</div>
