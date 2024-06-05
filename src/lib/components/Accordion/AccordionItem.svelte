<script lang="ts">
	import { context } from './Accordion.svelte';
	import { log, useActions, createUID, classProp } from '$internal';
	import { onMount, setContext } from 'svelte';

	import type { AccordionItemProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		disabled = $bindable(false),
		...props
	}: AccordionItemProps = $props();

	const ctx = context();
	const { uid } = createUID('item');
	const active = $derived(ctx.activeItems.includes(uid()));

	setContext('accordionitem-id', uid());

	onMount(() => {
		if (!ctx) log.error('<AccordionItem /> must be a direct child of <Accordion />');
		ctx.register({
			id: uid(),
			disabled
		});
	});
	$effect(() => {
		ctx.setDisabled(uid(), disabled);
	});
</script>

<div
	bind:this={self}
	use:useActions={use}
	id={uid()}
	class={classProp(klass, { active, disabled })}
	data-accordionitem=""
	data-disabled={disabled || undefined}
	data-state={active ? 'opened' : 'closed'}
	{...props}
>
	{@render children({ active, disabled })}
</div>
