<script lang="ts">
	import { useActions, classProp } from '$internal';
	import { useModalTitle } from './main.svelte.js';
	import type { ModalTitleProps } from './types.js';

	let { children, class: klass, use = [], self = $bindable(), ...props }: ModalTitleProps = $props();

	const ctx = useModalTitle();
</script>

<h2 bind:this={self} use:useActions={use} class={classProp(klass)} {...props} {...ctx.attrs}>
	{@render children({})}
</h2>
