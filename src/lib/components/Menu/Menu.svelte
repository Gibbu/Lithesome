<script lang="ts" context="module">
	import { setupContext } from '$internal';
	import { MenuContext } from './context.svelte.js';

	export const { context, contextName } = setupContext<MenuContext>();
</script>

<script lang="ts">
	import { useActions, classProp } from '$internal';
	import { setContext } from 'svelte';
	import type { MenuProps } from './types.js';

	let { children, use = [], class: klass, self = $bindable(), ...props }: MenuProps = $props();

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
