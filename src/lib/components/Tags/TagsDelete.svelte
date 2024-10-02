<script lang="ts">
	import { classProp, stateValue, useActions } from '$internal';
	import { useTagsDelete } from './main.svelte.js';
	import type { TagsDeleteProps } from './types.js';

	let { children, use = [], class: klass, self = $bindable(), tag, onClick, ...props }: TagsDeleteProps = $props();

	const ctx = useTagsDelete(
		{
			tag: stateValue(() => tag)
		},
		{
			onClick
		}
	);
</script>

<button bind:this={self} use:useActions={use} class={classProp(klass)} {...ctx.attrs} {...props}>
	{@render children?.({ disabled: false })}
</button>
