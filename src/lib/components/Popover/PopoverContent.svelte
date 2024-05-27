<script lang="ts">
	import { context } from './Popover.svelte';
	import { useFloating, useActions, getTransition, classProp, log } from '$lib/internal/index.js';
	import { useOutside, usePortal, useTrap } from '$lib/index.js';
	import { onMount } from 'svelte';
	import type { PopoverContentProps } from './types.js';

	let {
		children,
		transition,
		use = [],
		portalTarget = 'body',
		class: klass,
		self = $bindable(),
		placement = 'bottom',
		constrainViewport,
		sameWidth = false,
		...props
	}: PopoverContentProps = $props();

	const ctx = context();

	const { inTransition, outTransition } = getTransition(transition);
	const attrs = $derived({
		id: ctx.uid('content'),
		'aria-labelledby': ctx.uid('trigger'),
		role: 'menu',
		class: classProp(klass, { visible: ctx.visible }),
		'data-popovercontent': ''
	});

	onMount(async () => {
		if (!ctx) log.error('<PopoverContent> Must be a direct child of <Popover />');
	});

	$effect(() => {
		if (ctx.visible && self) ctx.content = self;
	});
</script>

{#if inTransition && outTransition && ctx.visible}
	{@const { config: inConf, transition: inFn } = inTransition}
	{@const { config: outConf, transition: outFn } = outTransition}
	<div
		bind:this={self}
		use:useFloating={{ anchor: ctx.trigger, arrow: ctx.arrow, sameWidth, constrainViewport, placement }}
		use:useOutside={{
			exclude: ctx.trigger,
			callback: () => {
				ctx.close();
			}
		}}
		use:usePortal={portalTarget}
		use:useActions={use}
		use:useTrap={{
			allowOutsideClick: true,
			onDeactivate: () => {
				ctx.visible = false;
			}
		}}
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
		use:useFloating={{ anchor: ctx.trigger, arrow: ctx.arrow, sameWidth, constrainViewport, placement }}
		use:useOutside={{
			exclude: ctx.trigger,
			callback: () => {
				ctx.close();
			}
		}}
		use:usePortal={portalTarget}
		use:useActions={use}
		use:useTrap={{
			allowOutsideClick: true,
			onDeactivate: () => {
				ctx.visible = false;
			}
		}}
		{...attrs}
		{...props}
	>
		{@render children({ visible: ctx.visible })}
	</div>
{/if}
