<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import { createContext } from './context.svelte.js';

	const contextName = 'accordion-context';

	export const context = () => getContext<ReturnType<typeof createContext>>(contextName);
</script>

<script lang="ts">
	import { useActions, classProp, type BaseProps } from '$lib/internal/index.js';
	import { setContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { active: boolean }> {
		single?: boolean;
	}

	let { children, use = [], class: klass, self = $bindable(), single = $bindable(false), ...props }: Props = $props();

	const ctx = createContext({ single });
	const active = $derived(ctx.activeItems.length > 0);

	setContext(contextName, ctx);

	$effect(() => {
		ctx.setSingle(single);
	});
</script>

<div
	bind:this={self}
	use:useActions={use}
	id={ctx.uid()}
	class={classProp(klass, { active })}
	data-accordion=""
	{...props}
>
	{@render children({ active })}
</div>
