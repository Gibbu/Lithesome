<script lang="ts">
	import { classProp, stateValue, useActions } from '$internal';
	import { useTagsItem } from './main.svelte.js';
	import type { TagsItemProps } from './types.js';

	let {
		children,
		value,
		class: klass,
		self = $bindable(),
		use = [],
		onDblclick,
		onKeydown,
		onBlur
	}: TagsItemProps = $props();

	const ctx = useTagsItem(
		{
			value: stateValue(() => value)
		},
		{
			onDblclick,
			onKeydown,
			onBlur
		}
	);
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs}>
	{@render children?.(ctx.state)}
</div>
