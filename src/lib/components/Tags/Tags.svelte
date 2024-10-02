<script lang="ts">
	import { classProp, stateValue, useActions } from '$internal';
	import { createRootContext } from './main.svelte.js';
	import type { TagsProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		self = $bindable(),
		value = $bindable([]),
		disabled = $bindable(false),
		blacklist = [],
		max = 0,
		unique = false,
		whitelist = [],
		onChange,
		...props
	}: TagsProps = $props();

	const ctx = createRootContext({
		value: stateValue(
			() => value,
			(v) => {
				value = v;
				onChange?.(v);
			}
		),
		disabled: stateValue(() => disabled),
		max: stateValue(() => max),
		whitelist: stateValue(() => whitelist),
		blacklist: stateValue(() => blacklist)
	});
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props}>
	{@render children?.(ctx.state)}
</div>
