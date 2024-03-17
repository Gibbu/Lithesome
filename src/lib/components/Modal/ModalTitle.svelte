<script lang="ts">
	import { useActions, type BaseProps } from '$lib/internal/index.js';
	import { context } from './Modal.svelte';

	interface Props extends BaseProps<HTMLHeadElement> {}

	let { children, class: klass, use = [], self, ...props }: Props = $props();

	const API = context();
	const classProp = $derived(typeof klass === 'function' ? klass({}) : klass);
</script>

<h2 id={API.uid('title')} bind:this={self} data-modaltitle="" use:useActions={use} class={classProp} {...props}>
	{@render children({})}
</h2>
