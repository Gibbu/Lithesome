<script lang="ts">
	import { useActions, getTransition, classProp } from '$lib/internal/index.js';
	import { context } from './Modal.svelte';
	import type { ModalOverlayProps } from './types.js';

	let { class: klass, use = [], self, transition, ...props }: ModalOverlayProps = $props();

	const ctx = context();
	const { inTransition, outTransition } = getTransition(transition);
	const attrs = $derived({
		id: ctx.uid('overlay'),
		'aria-hidden': 'true',
		'data-modaloverlay': '',
		class: classProp(klass)
	} as const);
</script>

{#if inTransition && outTransition && ctx.visible}
	{@const { config: inConf, transition: inFn } = inTransition}
	{@const { config: outConf, transition: outFn } = outTransition}
	<div bind:this={self} use:useActions={use} in:inFn={inConf} out:outFn={outConf} {...props} {...attrs}></div>
{:else if ctx.visible}
	<div bind:this={self} use:useActions={use} {...props} {...attrs}></div>
{/if}
