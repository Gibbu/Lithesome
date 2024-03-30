<script lang="ts">
	import { context } from './Tabs.svelte';
	import { useActions, classProp, type BaseProps } from '$lib/internal/index.js';

	interface Props extends BaseProps<HTMLDivElement> {}

	let { children, class: klass, use = [], self, ...props }: Props = $props();

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
