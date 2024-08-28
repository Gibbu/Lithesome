<script lang="ts">
	import { useActions, getTransition, classProp } from '$internal';
	import { usePortal, useTrap } from '$lib/index.js';
	import { useModalContent } from './main.svelte.js';
	import type { ModalContentProps } from './types.js';

	let { children, class: klass, use = [], self = $bindable(), transition, ...props }: ModalContentProps = $props();

	const ctx = useModalContent();
	const { inTransition, outTransition } = getTransition(transition);
</script>

{#if inTransition && outTransition && ctx.root.visible.val}
	{@const { config: inConf, transition: inFn } = inTransition}
	{@const { config: outConf, transition: outFn } = outTransition}
	<div
		bind:this={self}
		use:useTrap={{ allowOutsideClick: true }}
		use:usePortal={ctx.root.portalTarget.val}
		use:useActions={use}
		in:inFn={inConf}
		out:outFn={outConf}
		class={classProp(klass)}
		{...props}
		{...ctx.attrs}
	>
		{@render children({})}
	</div>
{:else if ctx.root.visible.val}
	<div
		bind:this={self}
		use:useTrap={{ allowOutsideClick: true }}
		use:useActions={use}
		class={classProp(klass)}
		{...props}
		{...ctx.attrs}
	>
		{@render children({})}
	</div>
{/if}
