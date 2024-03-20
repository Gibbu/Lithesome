<script lang="ts">
	import { useActions, type BaseProps } from '$lib/internal/index.js';
	import { context } from './Modal.svelte';

	interface Props extends BaseProps<HTMLHeadElement> {}

	let { children, class: klass, use = [], self, ...props }: Props = $props();

	const API = context();
	const classProp = $derived(typeof klass === 'function' ? klass({}) : klass);
</script>

<h2 bind:this={self} use:useActions={use} id={API.uid('title')} class={classProp} data-modaltitle="" {...props}>
	{@render children({})}
</h2>
