<script lang="ts">
	import { useActions, classProp } from '$internal';
	import { usePinValue } from './main.svelte.js';
	import type { PinValueProps } from './types.js';

	let { class: klass, use = [], self = $bindable(), name, ...props }: PinValueProps = $props();

	const ctx = usePinValue();
</script>

<input
	bind:this={self}
	bind:value={ctx.root.TransformedValue}
	use:useActions={use}
	class={classProp(klass)}
	{name}
	{...ctx.attrs}
	{...props}
	style="opacity: 0; pointer-events: none; user-select: none; scale: 0;"
/>
