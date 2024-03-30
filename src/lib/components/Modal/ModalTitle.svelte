<script lang="ts">
	import { useActions, classProp, type BaseProps } from '$lib/internal/index.js';
	import { context } from './Modal.svelte';

	interface Props extends BaseProps<HTMLHeadElement> {}

	let { children, class: klass, use = [], self = $bindable(), ...props }: Props = $props();

	const ctx = context();
</script>

<h2 bind:this={self} use:useActions={use} id={ctx.uid('title')} class={classProp(klass)} data-modaltitle="" {...props}>
	{@render children({})}
</h2>
