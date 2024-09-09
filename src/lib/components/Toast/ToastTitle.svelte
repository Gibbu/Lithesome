<script lang="ts">
	import { useActions, classProp } from '$internal';
	import { useToastTitle } from './main.svelte.js';
	import type { ToastTitleProps } from './types.js';

	let { children, use = [], class: klass, self = $bindable(), ...props }: ToastTitleProps = $props();

	const ctx = useToastTitle();
</script>

<h3 bind:this={self} use:useActions={use} class={classProp(klass)} {...ctx.attrs} {...props}>
	{@render children({})}
</h3>
