<script lang="ts">
	import { context } from './Tabs.svelte';
	import { useActions, type BaseProps } from '$lib/internal/index.js';

	interface Props extends BaseProps<HTMLDivElement> {}

	let { children, class: klass, use = [], self, ...props }: Props = $props();

	const API = context();
	const classProp = $derived(typeof klass === 'function' ? klass({}) : klass);
</script>

<div
	bind:this={self}
	use:useActions={use}
	class={classProp}
	role="tablist"
	aria-orientation={API.orientation}
	data-tabslist=""
	data-orientation={API.orientation}
	{...props}
>
	{@render children({})}
</div>
