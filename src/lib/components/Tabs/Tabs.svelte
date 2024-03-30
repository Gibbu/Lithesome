<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import { createContext } from './context.svelte.js';

	const contextName = 'tabs-context';

	export const context = () => getContext<ReturnType<typeof createContext>>(contextName);
</script>

<script lang="ts">
	import { createUID, useActions, classProp, type BaseProps } from '$lib/internal/index.js';
	import { setContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { active: string }> {
		orientation?: 'vertical' | 'horizontal';
		value?: string;
	}

	let { children, use = [], class: klass, self, orientation = 'horizontal', value, ...props }: Props = $props();

	const ctx = createContext({
		orientation,
		value
	});
	setContext(contextName, ctx);

	$effect(() => {
		ctx.setOrientation(orientation);
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
