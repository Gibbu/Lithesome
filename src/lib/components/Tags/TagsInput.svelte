<script lang="ts">
	import { classProp, stateValue, useActions } from '$internal';
	import { useTagsInput } from './main.svelte.js';
	import type { TagsInputProps } from './types.js';

	let { onKeydown, use = [], class: klass, self = $bindable(), ...props }: TagsInputProps = $props();

	const ctx = useTagsInput(
		{
			input: stateValue(() => self)
		},
		{
			onKeydown
		}
	);
</script>

<input bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props} />
