<script lang="ts" context="module">
	import { setupContext } from '$internal';
	import { TabsContext } from './context.svelte.js';

	export const { context, contextName } = setupContext<TabsContext>();
</script>

<script lang="ts">
	import { useActions, classProp } from '$internal';
	import { setContext } from 'svelte';
	import type { TabsProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		self = $bindable(),
		orientation = 'horizontal',
		value = $bindable(''),
		...props
	}: TabsProps = $props();

	const ctx = new TabsContext({
		orientation,
		value
	});
	setContext(contextName, ctx);

	$effect(() => {
		ctx.orientation = orientation;
	});
</script>

<div
	bind:this={self}
	id={ctx.uid()}
	use:useActions={use}
	class={classProp(klass, { tab: ctx.activeTab })}
	data-tabs=""
	data-orientation={orientation}
	data-active={ctx.activeTab}
	{...props}
>
	{@render children({ tab: ctx.activeTab })}
</div>
