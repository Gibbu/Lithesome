<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import { createContext } from './context.svelte.js';

	const contextName = 'accordion-context';

	export const context = () => getContext<ReturnType<typeof createContext>>(contextName);
</script>

<script lang="ts">
	import { createUID, useActions, type BaseProps } from '$lib/internal/index.js';
	import { setContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { active: boolean }> {
		single?: boolean;
	}

	let { children, use = [], class: klass, self, single, ...props } = $props<Props>();

	const { uid } = createUID('accordion');
	const API = createContext(uid, single);

	setContext(contextName, API);

	const active = $derived(API.activeItems.length > 0);
	const classProp = $derived(typeof klass === 'function' ? klass({ active }) : klass);
</script>

<div bind:this={self} id={uid()} use:useActions={use} class={classProp} data-accordion="" {...props}>
	{@render children({ active })}
</div>
