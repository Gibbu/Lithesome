<script lang="ts">
	import { useActions, classProp } from '$lib/internal/index.js';
	import { context } from './Modal.svelte';
	import type { ModalTitleProps } from './types.js';

	let { children, class: klass, use = [], self = $bindable(), ...props }: ModalTitleProps = $props();

	const ctx = context();
</script>

<h2 bind:this={self} use:useActions={use} id={ctx.uid('title')} class={classProp(klass)} data-modaltitle="" {...props}>
	{@render children({})}
</h2>
