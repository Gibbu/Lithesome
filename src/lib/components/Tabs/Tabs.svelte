<script lang="ts" context="module">
	import { setupContext } from '$lib/internal/index.js';
	import { TabsContext } from './context.svelte.js';

	export const { context, contextName } = setupContext<TabsContext>('tabs');
</script>

<script lang="ts">
	import { useActions, classProp, type BaseProps } from '$lib/internal/index.js';
	import { setContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { active: string }> {
		orientation?: 'vertical' | 'horizontal';
		value?: string;
	}

	let {
		children,
		use = [],
		class: klass,
		self = $bindable(),
		orientation = 'horizontal',
		value = $bindable(''),
		...props
	}: Props = $props();

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
	class={classProp(klass, { active: ctx.activeTab })}
	data-tabs=""
	data-orientation={orientation}
	data-active={ctx.activeTab}
	{...props}
>
	{@render children({ active: ctx.activeTab })}
</div>
