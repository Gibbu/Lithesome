<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import { createContext } from './context.svelte.js';

	const contextName = 'tabs-context';

	export const context = () => getContext<ReturnType<typeof createContext>>(contextName);
</script>

<script lang="ts">
	import { createUID, useActions, type BaseProps } from '$lib/internal/index.js';
	import { setContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { active: string }> {
		orientation?: 'vertical' | 'horizontal';
		value?: string;
	}

	let { children, use = [], class: klass, self, orientation = 'horizontal', value, ...props }: Props = $props();

	const { uid } = createUID('tabs');
	const API = createContext(uid, {
		orientation,
		value
	});
	const classProp = $derived(typeof klass === 'function' ? klass({ active: API.activeTab }) : klass);
	setContext(contextName, API);

	$effect(() => {
		API.setOrientation(orientation);
	});
</script>

<div
	bind:this={self}
	id={uid()}
	use:useActions={use}
	class={classProp}
	data-tabs=""
	data-orientation={orientation}
	data-active={API.activeTab}
	{...props}
>
	{@render children({ active: API.activeTab })}
</div>
