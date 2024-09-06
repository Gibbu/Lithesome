<script lang="ts">
	import { useActions, classProp } from '$internal';
	import { useToastDescription } from './main.svelte.js';
	import type { ToastMessageProps } from './types.js';

	let { children, use = [], class: klass, self = $bindable(), ...props }: ToastMessageProps = $props();

	const ctx = useToastDescription();
</script>

<p bind:this={self} use:useActions={use} class={classProp(klass)} {...ctx.attrs} {...props}>
	{@render children({})}
</p>
