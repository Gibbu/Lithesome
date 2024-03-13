<script lang="ts">
	import { useActions, type BaseProps, trap, type Transition, getTransition } from '$lib/internal/index.js';
	import { onMount } from 'svelte';
	import { context } from './Modal.svelte';

	interface Props extends BaseProps<HTMLDivElement> {
		/**
		 * The `svelte/transtion` you wish to use.
		 *
		 * @see https://lithesome.dev/docs/api#transition-prop
		 */
		transition?: Transition;
	}

	let { children, class: klass, use = [], self, transition, ...props } = $props<Props>();

	const API = context();
	const classProp = $derived(typeof klass === 'function' ? klass({}) : klass);
	const _transition = getTransition(transition);
	const attrs = $derived({
		id: API.uid('content'),
		class: classProp,
		role: 'dialog',
		'aria-modal': 'true',
		tabindex: -1,
		'aria-describedby': API.uid('description'),
		'aria-labelledby': API.uid('title'),
		'data-modalcontent': ''
	} as const);
</script>

{#if _transition}
	{#if API.visible}
		<div
			bind:this={self}
			use:trap={{ allowOutsideClick: true }}
			use:useActions={use}
			in:_transition.in.fn|global={_transition.in.params}
			out:_transition.out.fn|global={_transition.out.params}
			{...props}
			{...attrs}
		>
			{@render children({})}
		</div>
	{/if}
{:else if API.visible}
	<div bind:this={self} use:trap={{ allowOutsideClick: true }} use:useActions={use} {...props} {...attrs}>
		{@render children({})}
	</div>
{/if}
