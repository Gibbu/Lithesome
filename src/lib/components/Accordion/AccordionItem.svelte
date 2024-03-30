<script lang="ts">
	import { context } from './Accordion.svelte';
	import { log, useActions, createUID, classProp, type BaseProps } from '$lib/internal/index.js';
	import { onMount, setContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { active: boolean; disabled: boolean }> {
		disabled?: boolean;
	}

	let { children, class: klass, use = [], self = $bindable(), disabled = $bindable(false), ...props }: Props = $props();

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
