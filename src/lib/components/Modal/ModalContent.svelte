<script lang="ts">
	import { useActions, getTransition, classProp } from '$internal';
	import { useTrap } from '$lib/index.js';
	import { context } from './Modal.svelte';
	import type { ModalContentProps } from './types.js';

	let { children, class: klass, use = [], self = $bindable(), transition, ...props }: ModalContentProps = $props();

	const ctx = context();
	const { inTransition, outTransition } = getTransition(transition);
	const attrs = $derived({
		id: ctx.uid('content'),
		class: classProp(klass),
		role: 'dialog',
		'aria-modal': 'true',
		tabindex: -1,
		'aria-describedby': ctx.uid('description'),
		'aria-labelledby': ctx.uid('title'),
		'data-modalcontent': ''
	} as const);
</script>

{#if inTransition && outTransition && ctx.visible}
	{@const { config: inConf, transition: inFn } = inTransition}
	{@const { config: outConf, transition: outFn } = outTransition}
	<div
		bind:this={self}
		use:useTrap={{ allowOutsideClick: true }}
		use:useActions={use}
		in:inFn|global={inConf}
		out:outFn|global={outConf}
		{...props}
		{...attrs}
	>
		{@render children({})}
	</div>
{:else if ctx.visible}
	<div bind:this={self} use:useTrap={{ allowOutsideClick: true }} use:useActions={use} {...props} {...attrs}>
		{@render children({})}
	</div>
{/if}
