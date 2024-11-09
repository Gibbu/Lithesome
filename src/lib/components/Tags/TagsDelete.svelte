<script lang="ts">
	import { classProp, stateValue, useActions } from '$internal';
	import { useTagsDelete } from './main.svelte.js';
	import type { TagsDeleteProps } from './types.js';

	let { children, use = [], self = $bindable(), class: klass, value, onClick, ...props }: TagsDeleteProps = $props();

	const ctx = useTagsDelete(
		{
			value: stateValue(() => value)
		},
		{
			onClick
		}
	);
</script>

<button bind:this={self} use:useActions={use} class={classProp(klass)} {...ctx.attrs} {...props}>
	{@render children?.({})}
</button>
