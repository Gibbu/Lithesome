<script lang="ts">
	import { context } from './Accordion.svelte';
	import { log, useActions, createUID, type BaseProps } from '$lib/internal/index.js';
	import { onMount, setContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { active: boolean }> {
		disabled?: boolean;
	}

	let { children, class: klass, use = [], self, disabled = false, ...props }: Props = $props();

	const API = context();
	const { uid } = createUID('item');

	onMount(() => {
		if (!API) log.error('<AccordionItem /> must be a direct child of <Accordion />');
		if (!disabled)
			API.register({
				id: uid(),
				disabled
			});
	});

	const active = $derived(API.activeItems.includes(uid()));
	const classProp = $derived(typeof klass === 'function' ? klass({ active }) : klass);

	setContext('accordionitem-id', uid());
</script>

<div
	bind:this={self}
	id={uid()}
	use:useActions={use}
	class={classProp}
	data-accordionitem=""
	data-disabled={disabled || undefined}
	data-state={active ? 'opened' : 'closed'}
	{...props}
>
	{@render children({ active })}
</div>
