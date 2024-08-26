<script lang="ts">
	import { useActions, getTransition, classProp } from '$internal';
	import { useModalOverlay } from './main.svelte.js';
	import type { ModalOverlayProps } from './types.js';

	let { class: klass, use = [], self, transition, ...props }: ModalOverlayProps = $props();

	const ctx = useModalOverlay();
	const { inTransition, outTransition } = getTransition(transition);
</script>

{#if inTransition && outTransition && ctx.Visible}
	{@const { config: inConf, transition: inFn } = inTransition}
	{@const { config: outConf, transition: outFn } = outTransition}
	<div
		bind:this={self}
		use:useActions={use}
		in:inFn|global={inConf}
		out:outFn|global={outConf}
		{...props}
		{...ctx.attrs}
		class={classProp(klass)}
	></div>
{:else if ctx.Visible}
	<div bind:this={self} use:useActions={use} {...props} {...ctx.attrs} class={classProp(klass)}></div>
{/if}
