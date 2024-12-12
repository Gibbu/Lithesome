<script lang="ts">
	import { classProp, stateValue, useActions } from '$internal';
	import { useTreeGroup } from './main.svelte.js';

	import type { TreeGroupProps } from './types.js';

	let {
		children,
		class: klass,
		self = $bindable(),
		use = [],
		item,
		active = $bindable(false),
		...props
	}: TreeGroupProps = $props();

	const ctx = useTreeGroup({
		active: stateValue(
			() => active,
			(v) => (active = v)
		)
	});
</script>

{#if ctx.Visible}
	<ul bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props}>
		{@render children?.(ctx.state)}
	</ul>
{/if}
