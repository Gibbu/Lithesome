<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import { createContext } from './context.svelte.js';

	const contextName = 'menu-context';

	export const context = () => getContext<ReturnType<typeof createContext>>(contextName);
</script>

<script lang="ts">
	import { useActions, classProp, type BaseProps } from '$lib/internal/index.js';
	import { setContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { visible: boolean }> {}

	let { children, use = [], class: klass, self = $bindable(), ...props }: Props = $props();

	const ctx = createContext();

	setContext(contextName, ctx);
</script>

<div
	bind:this={self}
	use:useActions={use}
	id={ctx.uid()}
	class={classProp(klass, { visible: ctx.visible })}
	data-menu=""
	data-state={ctx.visible ? 'opened' : 'closed'}
	{...props}
>
	{@render children({ visible: ctx.visible })}
</div>
