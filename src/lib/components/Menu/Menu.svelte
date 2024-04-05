<script lang="ts" context="module">
	import { setupContext } from '$lib/internal/index.js';
	import { MenuContext } from './context.svelte.js';

	export const { context, contextName } = setupContext<MenuContext>('menu');
</script>

<script lang="ts">
	import { useActions, classProp, type BaseProps } from '$lib/internal/index.js';
	import { setContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { visible: boolean }> {}

	let { children, use = [], class: klass, self = $bindable(), ...props }: Props = $props();

	const ctx = new MenuContext();

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
