<script lang="ts">
	import { context } from './Combobox.svelte';
	import { anchorElement, useActions, getTransition, classProp, log } from '$lib/internal/index.js';
	import { usePortal, useOutside } from '$lib/index.js';
	import { onMount } from 'svelte';
	import type { ComboboxContentProps } from './types.js';

	let {
		children,
		transition,
		use = [],
		portalTarget = 'body',
		sameWidth = false,
		class: klass,
		self = $bindable(),
		placement = 'bottom',
		constrainViewport = false,
		...props
	}: ComboboxContentProps = $props();

	const ctx = context();
	let contentCleanup = $state<ReturnType<typeof anchorElement> | undefined>(undefined);

	const { inTransition, outTransition } = getTransition(transition);
	const attrs = $derived({
		id: ctx.uid('content'),
		'aria-labelledby': ctx.uid('trigger'),
		role: 'listbox',
		class: classProp(klass, { visible: ctx.visible }),
		'data-comboboxcontent': '',
		hidden: !ctx.mounted || undefined
	});

	onMount(() => {
		if (!ctx) log.error('<ComboboxContent> Must be a direct child of <Combobox />');
	});

	$effect(() => {
		if (ctx.visible && self) ctx.content = self;
	});
	$effect(() => {
		if (ctx.visible && ctx.trigger && ctx.content) {
			contentCleanup = anchorElement(
				{
					anchor: ctx.trigger,
					target: ctx.content,
					arrow: ctx.arrow
				},
				{
					placement,
					constrainViewport,
					sameWidth
				}
			);
		}
		return () => {
			contentCleanup?.();
		};
	});
</script>

{#if inTransition && outTransition && ctx.visible}
	{@const { config: inConf, transition: inFn } = inTransition}
	{@const { config: outConf, transition: outFn } = outTransition}
	<div
		bind:this={self}
		use:useOutside={{
			exclude: ctx.trigger,
			callback: () => ctx.close()
		}}
		use:usePortal={portalTarget}
		use:useActions={use}
		in:inFn={inConf}
		out:outFn={outConf}
		{...attrs}
		{...props}
	>
		{@render children({ visible: ctx.visible })}
	</div>
{:else if ctx.visible}
	<div
		bind:this={self}
		use:useOutside={{
			exclude: ctx.trigger,
			callback: () => ctx.close()
		}}
		use:usePortal={portalTarget}
		use:useActions={use}
		{...attrs}
		{...props}
	>
		{@render children({ visible: ctx.visible })}
	</div>
{/if}
