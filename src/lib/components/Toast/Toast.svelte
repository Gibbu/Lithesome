<script lang="ts">
	import { useActions, classProp } from '$internal';
	import { createRootContext } from './main.svelte.js';
	import type { ToastProps } from './types.js';

	let { children, use = [], class: klass, self = $bindable(), ...props }: ToastProps = $props();

	const ctx = createRootContext();
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass)} {...ctx.attrs} {...props}>
	{@render children?.({})}
</div>
