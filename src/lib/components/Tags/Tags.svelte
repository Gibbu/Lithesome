<script lang="ts">
	import { classProp, stateValue, useActions } from '$internal';
	import { createTagsRootContext } from './main.svelte.js';

	import type { TagsProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		value = $bindable([]),
		max = 0,
		disabled = $bindable(false),
		blacklist = [],
		whitelist = [],
		onClick
	}: TagsProps = $props();

	const ctx = createTagsRootContext(
		{
			value: stateValue(
				() => value,
				(v) => {
					value = v;
				}
			),
			max: stateValue(() => max),
			disabled: stateValue(() => disabled),
			blacklist: stateValue(() => blacklist),
			whitelist: stateValue(() => whitelist)
		},
		{
			onClick
		}
	);
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs}>
	{@render children?.(ctx.state)}
</div>
