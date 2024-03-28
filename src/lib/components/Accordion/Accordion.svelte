<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import { createContext } from './context.svelte.js';

	const contextName = 'accordion-context';

	export const context = () => getContext<ReturnType<typeof createContext>>(contextName);
</script>

<script lang="ts">
	import { createUID, useActions, classProp, type BaseProps } from '$lib/internal/index.js';
	import { setContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { active: boolean }> {
		single?: boolean;
	}

	let { children, use = [], class: klass, self = $bindable(), single, ...props }: Props = $props();

	const { uid } = createUID('accordion');
	const API = createContext(uid, single);
	const active = $derived(API.activeItems.length > 0);

	setContext(contextName, API);
</script>

<div bind:this={self} use:useActions={use} id={uid()} class={classProp(klass, { active })} data-accordion="" {...props}>
	{@render children({ active })}
</div>
