<script lang="ts" context="module">
	import { setupContext } from '$internal';
	import { ToastContext } from './context.svelte.js';

	export const { context, contextName } = setupContext<ToastContext>();
</script>

<script lang="ts">
	import { useActions, classProp } from '$internal';
	import type { ToastProps } from './types.js';
	import { setContext } from 'svelte';

	let { children, use = [], class: klass, self = $bindable(), ...props }: ToastProps = $props();

	const ctx = new ToastContext();

	setContext(contextName, ctx);
</script>

<div
	bind:this={self}
	use:useActions={use}
	class={classProp(klass)}
	role="alert"
	aria-labelledby={ctx.uid('title')}
	aria-describedby={ctx.uid('description')}
	aria-live="assertive"
	tabindex="-1"
	data-toast=""
	{...props}
>
	{@render children({})}
</div>
