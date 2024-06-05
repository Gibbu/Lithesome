<script lang="ts" context="module">
	import { setupContext } from '$internal';
	import { HovercardContext } from './context.svelte.js';

	export const { context, contextName } = setupContext<HovercardContext>();
</script>

<script lang="ts">
	import { useActions, classProp, parseDelay } from '$internal';
	import { setContext } from 'svelte';
	import type { HovercardProps } from './types.js';

	let { children, use = [], class: klass, self = $bindable(), delay = 700, ...props }: HovercardProps = $props();

	const delays = parseDelay(delay);

	const ctx = new HovercardContext({ delays });

	setContext(contextName, ctx);
</script>

<div
	bind:this={self}
	use:useActions={use}
	id={ctx.uid()}
	class={classProp(klass, { visible: ctx.visible })}
	data-hovercard=""
	data-state={ctx.visible ? 'opened' : 'closed'}
	{...props}
>
	{@render children({ visible: ctx.visible })}
</div>
