<script lang="ts">
	import { useActions, classProp } from '$internal';
	import { useTabsContent } from './main.svelte.js';
	import type { TabsContentProps } from './types.js';

	let { children, class: klass, use = [], self = $bindable(), value, ...props }: TabsContentProps = $props();

	const ctx = useTabsContent({ value });
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props}>
	{@render children(ctx.state)}
</div>
