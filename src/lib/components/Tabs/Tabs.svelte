<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import { TabsContext } from './context.svelte.js';

	const contextName = 'tabs-context';

	export const context = () => getContext<TabsContext>(contextName);
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
		self,
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
