<script lang="ts">
	import { useActions, classProp } from '$internal';
	import { useTabsList } from './main.svelte.js';
	import type { TabsListProps } from './types.js';

	let { children, class: klass, use = [], self = $bindable(), ...props }: TabsListProps = $props();

	const ctx = useTabsList();
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass)} {...ctx.attrs} {...props}>
	{@render children({})}
</div>
