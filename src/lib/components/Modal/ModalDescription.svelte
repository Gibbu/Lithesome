<script lang="ts">
	import { useActions, classProp } from '$internal';
	import { useModalDescription } from './main.svelte.js';
	import type { ModalDescriptionProps } from './types.js';

	let { children, class: klass, use = [], self = $bindable(), ...props }: ModalDescriptionProps = $props();

	const ctx = useModalDescription();
</script>

<p bind:this={self} use:useActions={use} class={classProp(klass)} {...ctx.attrs} {...props}>
	{@render children({})}
</p>
