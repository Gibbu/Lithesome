<script lang="ts">
	import { useActions, getTransition, classProp, type BaseProps, type Transition } from '$lib/internal/index.js';
	import { context } from './Modal.svelte';

	interface Props extends Omit<BaseProps<HTMLDivElement>, 'children'> {
		/**
		 * The `svelte/transtion` you wish to use.
		 *
		 * @see https://lithesome.dev/docs/api#transition-prop
		 */
		transition?: Transition;
	}

	let { class: klass, use = [], self, transition, ...props }: Props = $props();

	const API = context();
	const _transition = getTransition(transition);
	const attrs = $derived({
		id: API.uid('overlay'),
		'aria-hidden': 'true',
		'data-modaloverlay': '',
		class: classProp(klass)
	} as const);
</script>

{#if _transition}
	{#if API.visible}
		<div
			bind:this={self}
			use:useActions={use}
			in:_transition.in.fn={_transition.in.params}
			out:_transition.out.fn={_transition.out.params}
			{...props}
			{...attrs}
		/>
	{/if}
{:else if API.visible}
	<div bind:this={self} use:useActions={use} {...props} {...attrs} />
{/if}
