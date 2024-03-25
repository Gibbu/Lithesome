<script lang="ts">
	import { context } from './Pin.svelte';
	import { log, useActions, createUID, classProp, type BaseProps } from '$lib/internal/index.js';
	import { onMount } from 'svelte';

	interface Props extends Omit<BaseProps<HTMLInputElement>, 'children'> {
		/**
		 * The HTML Input element name attribute.
		 *
		 * Used for native form submissions.
		 */
		name?: string;
	}

	let { class: klass, use = [], self, name, ...props }: Props = $props();

	const API = context();
	const { uid } = createUID('input');

	onMount(() => {
		if (!API) log.error('<AccordionItem /> must be a direct child of <Accordion />');
	});
</script>

<input
	bind:this={self}
	bind:value={API.transformedValue}
	use:useActions={use}
	id={uid()}
	class={classProp(klass)}
	aria-hidden="true"
	tabindex="-1"
	hidden
	{name}
	data-pininput=""
	{...props}
	style="opacity: 0; pointer-events: none; user-select: none; scale: 0;"
/>
