<script lang="ts">
	import { context } from './Accordion.svelte';
	import { log, useActions, createUID, classProp, type BaseProps } from '$lib/internal/index.js';
	import { onMount, setContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { active: boolean }> {
		disabled?: boolean;
	}

	let { children, class: klass, use = [], self, disabled = false, ...props }: Props = $props();

	const API = context();
	const { uid } = createUID('item');

	onMount(() => {
		if (!API) log.error('<AccordionItem /> must be a direct child of <Accordion />');
		API.register({
			id: uid(),
			disabled
		});
	});

	const active = $derived(API.activeItems.includes(uid()));

	setContext('accordionitem-id', uid());

	$effect(() => {
		API.setDisabled(uid(), disabled);
	});
</script>

<div
	bind:this={self}
	use:useActions={use}
	id={uid()}
	class={classProp(klass, { active })}
	data-accordionitem=""
	data-disabled={disabled || undefined}
	data-state={active ? 'opened' : 'closed'}
	{...props}
>
	{@render children({ active })}
</div>
