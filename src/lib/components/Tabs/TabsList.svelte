<script lang="ts">
	import { context } from './Tabs.svelte';
	import { useActions, classProp } from '$internal';
	import type { TabsListProps } from './types.js';

	let { children, class: klass, use = [], self, ...props }: TabsListProps = $props();

	const ctx = context();
</script>

<div
	bind:this={self}
	use:useActions={use}
	class={classProp(klass)}
	role="tablist"
	aria-orientation={ctx.orientation}
	data-tabslist=""
	data-orientation={ctx.orientation}
	{...props}
>
	{@render children({})}
</div>
