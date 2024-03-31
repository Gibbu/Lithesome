<script lang="ts">
	import { context } from './Pin.svelte';
	import { log, useActions, classProp, type BasePropsNoChildren } from '$lib/internal/index.js';
	import { onMount } from 'svelte';

	interface Props extends BasePropsNoChildren<HTMLInputElement> {
		/**
		 * The HTML Input element name attribute.
		 *
		 * Used for native form submissions.
		 */
		name?: string;
	}

	let { class: klass, use = [], self = $bindable(), name, ...props }: Props = $props();

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
