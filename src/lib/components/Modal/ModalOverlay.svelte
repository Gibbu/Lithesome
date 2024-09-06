<script lang="ts">
	import { useActions, getTransition, classProp } from '$internal';
	import { usePortal } from '$lib/actions/portal.js';
	import { useModalOverlay } from './main.svelte.js';
	import type { ModalOverlayProps } from './types.js';

	let { class: klass, use = [], self, transition, ...props }: ModalOverlayProps = $props();

	const ctx = useModalOverlay();
	const { inTransition, outTransition } = getTransition(transition);
</script>

{#if inTransition && outTransition && ctx.root.$visible.val}
	{@const { config: inConf, transition: inFn } = inTransition}
	{@const { config: outConf, transition: outFn } = outTransition}
	<div
		bind:this={self}
		use:useActions={use}
		use:usePortal={ctx.root.$portalTarget.val}
		in:inFn={inConf}
		out:outFn={outConf}
		{...props}
		{...ctx.attrs}
		class={classProp(klass)}
	></div>
{:else if ctx.root.$visible.val}
	<div bind:this={self} use:useActions={use} {...props} {...ctx.attrs} class={classProp(klass)}></div>
{/if}
