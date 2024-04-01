<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import { HovercardContext } from './context.svelte.js';

	const contextName = 'hovercard-context';

	export const context = () => getContext<HovercardContext>(contextName);
</script>

<script lang="ts">
	import { useActions, classProp, type BaseProps, parseDelay } from '$lib/internal/index.js';
	import { setContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { visible: boolean }> {
		/**
		 * The delay between the the content being visible or not.
		 *
		 * Passing an array will allow you to change the delays for in and out.
		 */
		delay?: number | [number, number];
	}

	let { children, use = [], class: klass, self = $bindable(), delay = 700, ...props }: Props = $props();

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
