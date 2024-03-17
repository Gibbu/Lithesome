<script lang="ts">
	import { context } from './Pin.svelte';
	import { log, useActions, createUID, type BaseProps } from '$lib/internal/index.js';
	import { onMount } from 'svelte';

	interface Props extends Omit<BaseProps<HTMLInputElement>, 'children'> {
		/** The HTML Input element name attribute. */
		name?: string;
	}

	let { class: klass, use = [], self, name, ...props }: Props = $props();

	const API = context();
	const { uid } = createUID('input');
	const classProp = $derived(typeof klass === 'function' ? klass({}) : klass);

	onMount(() => {
		if (!API) log.error('<AccordionItem /> must be a direct child of <Accordion />');
	});
</script>

<input
	bind:this={self}
	bind:value={API.transformedValue}
	id={uid()}
	use:useActions={use}
	aria-hidden="true"
	tabindex="-1"
	hidden
	class={classProp}
	data-pininput=""
	{name}
	{...props}
	style="opacity: 0; pointer-events: none; user-select: none; scale: 0;"
/>
