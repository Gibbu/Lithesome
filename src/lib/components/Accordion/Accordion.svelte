<script lang="ts" context="module">
	import { setupContext } from '$lib/internal/index.js';
	import { AccordionContext } from './context.svelte.js';

	export const { context, contextName } = setupContext<AccordionContext>('accordion');
</script>

<script lang="ts">
	import { useActions, classProp, type BaseProps } from '$lib/internal/index.js';
	import { setContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { active: boolean }> {
		single?: boolean;
	}

	let { children, use = [], class: klass, self = $bindable(), single = $bindable(false), ...props }: Props = $props();

	const ctx = new AccordionContext({ single });
	const active = $derived(ctx.activeItems.length > 0);

	setContext(contextName, ctx);

	$effect(() => {
		ctx.single = single;
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
