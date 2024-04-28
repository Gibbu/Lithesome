<script lang="ts">
	import { context } from './Pin.svelte';
	import { log, useActions, classProp } from '$lib/internal/index.js';
	import { onMount } from 'svelte';
	import type { PinValueProps } from './types.js';

	let { class: klass, use = [], self = $bindable(), name, ...props }: PinValueProps = $props();

	const ctx = context();

	onMount(() => {
		if (!ctx) log.error('<AccordionItem /> must be a direct child of <Accordion />');
	});
</script>

<input
	bind:this={self}
	bind:value={ctx.transformedValue}
	use:useActions={use}
	id={ctx.uid('value')}
	class={classProp(klass)}
	aria-hidden="true"
	tabindex="-1"
	hidden
	{name}
	data-pininput=""
	{...props}
	style="opacity: 0; pointer-events: none; user-select: none; scale: 0;"
/>
