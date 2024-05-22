<script lang="ts">
	import { useActions, classProp } from '$lib/internal/index.js';
	import { context } from './Toast.svelte';
	import type { ToastTitleProps } from './types.js';

	let { children, use = [], class: klass, self = $bindable(), ...props }: ToastTitleProps = $props();

	const ctx = context();
</script>

<h3 bind:this={self} use:useActions={use} id={ctx.uid('title')} class={classProp(klass)} data-toasttitle="" {...props}>
	{@render children({})}
</h3>
