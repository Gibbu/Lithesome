<script lang="ts">
	import { classProp, stateValue, useActions } from '$internal';
	import { createTreeItemContext } from './main.svelte.js';

	import type { TreeItemProps } from './types.js';

	let {
		children,
		class: klass,
		self = $bindable(),
		use = [],
		disabled = $bindable(false),
		id,
		onClick,
		...props
	}: TreeItemProps = $props();

	const ctx = createTreeItemContext({
		id: stateValue(() => id),
		disabled: stateValue(() => disabled)
	});
</script>

<li bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props}>
	{@render children?.(ctx.state)}
</li>
