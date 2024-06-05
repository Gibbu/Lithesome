<script lang="ts" context="module">
	import { setupContext } from '$internal';
	import { AccordionContext } from './context.svelte.js';

	export const { context, contextName } = setupContext<AccordionContext>();
</script>

<script lang="ts">
	import { useActions, classProp } from '$internal';
	import { setContext } from 'svelte';
	import type { AccordionProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		self = $bindable(),
		single = $bindable(false),
		...props
	}: AccordionProps = $props();

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
