<script lang="ts">
	import { classProp, stateValue, useActions } from '$internal';
	import { useTreeButton } from './main.svelte.js';

	import type { TreeButtonProps } from './types.js';

	let {
		children,
		class: klass,
		self = $bindable(),
		use = [],
		disabled = $bindable(false),
		id,
		onClick,
		onKeydown,
		...props
	}: TreeButtonProps = $props();

	const ctx = useTreeButton({
		onClick,
		onKeydown
	});
</script>

<button bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props}>
	{@render children?.(ctx.state)}
</button>
