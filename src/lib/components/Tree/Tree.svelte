<script lang="ts">
	import { classProp, stateValue, useActions } from '$internal';
	import { createTreeRootContext } from './main.svelte.js';

	import type { TreeProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		value = $bindable(),
		forceVisible = false,
		...props
	}: TreeProps = $props();

	const ctx = createTreeRootContext({
		value: stateValue(
			() => value || [],
			(v) => (value = v)
		),
		forceVisible: stateValue(() => forceVisible)
	});
</script>

<ul bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props}>
	{@render children?.(ctx.state)}
</ul>
