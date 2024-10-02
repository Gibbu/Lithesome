<script lang="ts">
	import { classProp, useActions } from '$internal';
	import { useTagsInput } from './main.svelte.js';
	import type { TagsInputProps } from './types.js';

	let { use, class: klass, self, onKeydown, onPaste, ...props }: TagsInputProps = $props();

	const ctx = useTagsInput({
		onKeydown,
		onPaste
	});
</script>

<input bind:this={self} use:useActions={use} class={classProp(klass)} {...ctx.attrs} {...props} />
