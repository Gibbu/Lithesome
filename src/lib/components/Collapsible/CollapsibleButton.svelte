<script lang="ts">
	import { useCollapsibleButton } from './main.svelte.js';
	import { useActions, classProp } from '$internal';
	import type { CollapsibleButtonProps } from './types.js';

	let { children, class: klass, use = [], self = $bindable(), onClick, ...props }: CollapsibleButtonProps = $props();

	const ctx = useCollapsibleButton({
		onClick
	});
</script>

<button
	type="button"
	bind:this={self}
	use:useActions={use}
	class={classProp(klass, ctx.state)}
	{...ctx.attrs}
	{...props}
>
	{@render children?.(ctx.state)}
</button>
