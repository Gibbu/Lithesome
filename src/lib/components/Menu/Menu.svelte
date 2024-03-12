<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import { createContext } from './context.svelte.js';

	const contextName = 'menu-context';

	export const context = () => getContext<ReturnType<typeof createContext>>(contextName);
</script>

<script lang="ts">
	import { createUID, useActions, type BaseProps } from '$lib/internal/index.js';
	import { setContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { visible: boolean }> {}

	let { children, use = [], class: klass, ...props } = $props<Props>();

	const { uid } = createUID('menu');
	const API = createContext(uid);

	setContext(contextName, API);

	const classProp = $derived(typeof klass === 'function' ? klass({ visible: API.visible }) : klass);
</script>

<div
	use:useActions={use}
	data-menu=""
	data-state={API.visible ? 'opened' : 'closed'}
	id={uid()}
	{...props}
	class={classProp}
>
	{@render children({ visible: API.visible })}
</div>
