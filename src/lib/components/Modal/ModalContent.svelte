<script lang="ts">
	import { useActions, getTransition, classProp, type BaseProps, trap, type Transition } from '$lib/internal/index.js';
	import { context } from './Modal.svelte';

	interface Props extends BaseProps<HTMLDivElement> {
		/**
		 * The `svelte/transtion` you wish to use.
		 *
		 * @see https://lithesome.dev/docs/api#transition-prop
		 */
		transition?: Transition;
	}

	let { children, class: klass, use = [], self = $bindable(), transition, ...props }: Props = $props();

	const ctx = context();
	const _transition = getTransition(transition);
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

{#if _transition}
	{#if ctx.visible}
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
{:else if ctx.visible}
	<div bind:this={self} use:trap={{ allowOutsideClick: true }} use:useActions={use} {...props} {...attrs}>
		{@render children({})}
	</div>
{/if}
