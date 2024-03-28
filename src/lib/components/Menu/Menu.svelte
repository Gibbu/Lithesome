<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import { createContext } from './context.svelte.js';

	const contextName = 'menu-context';

	export const context = () => getContext<ReturnType<typeof createContext>>(contextName);
</script>

<script lang="ts">
	import { createUID, useActions, classProp, type BaseProps } from '$lib/internal/index.js';
	import { setContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { visible: boolean }> {}

	let { children, use = [], class: klass, self = $bindable(), ...props }: Props = $props();

	const { uid } = createUID('menu');
	const API = createContext(uid);

	setContext(contextName, API);
</script>

<div
	bind:this={self}
	use:useActions={use}
	id={uid()}
	class={classProp(klass, { visible: API.visible })}
	data-menu=""
	data-state={API.visible ? 'opened' : 'closed'}
	{...props}
>
	{@render children({ visible: API.visible })}
</div>
