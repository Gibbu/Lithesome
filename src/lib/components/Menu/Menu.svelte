<script lang="ts">
	import { useActions, classProp, stateValue } from '$internal';
	import { createRootContext } from './main.svelte.js';
	import type { MenuProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		visible = $bindable(false),
		self = $bindable(),
		...props
	}: MenuProps = $props();

	const ctx = createRootContext({
		visible: stateValue(
			() => visible,
			(v) => (visible = v)
		)
	});
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props}>
	{@render children?.(ctx.state)}
</div>
