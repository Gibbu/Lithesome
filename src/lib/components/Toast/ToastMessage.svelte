<script lang="ts">
	import { useActions, classProp } from '$lib/internal/index.js';
	import { context } from './Toast.svelte';
	import type { ToastMessageProps } from './types.js';

	let { children, use = [], class: klass, self = $bindable(), ...props }: ToastMessageProps = $props();

	const ctx = context();
</script>

<p
	bind:this={self}
	use:useActions={use}
	id={ctx.uid('description')}
	class={classProp(klass)}
	data-toastdescription=""
	{...props}
>
	{@render children({})}
</p>
