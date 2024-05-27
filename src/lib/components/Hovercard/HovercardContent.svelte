<script lang="ts">
	import { context } from './Hovercard.svelte';
	import { useFloating, useActions, getTransition, classProp, log, type Handler } from '$lib/internal/index.js';
	import { useOutside, usePortal } from '$lib/index.js';
	import { onMount } from 'svelte';
	import type { HovercardContentProps } from './types.js';

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
		onMouseenter,
		onMouseleave,
		...props
	}: HovercardContentProps = $props();

	const ctx = context();

	const { inTransition, outTransition } = getTransition(transition);
	const attrs = $derived({
		id: ctx.uid('content'),
		'aria-labelledby': ctx.uid('trigger'),
		class: classProp(klass, { visible: ctx.visible }),
		'data-hovercardcontent': ''
	} as const);

	onMount(async () => {
		if (!ctx) log.error('<HoverCardContent> Must be a direct child of <HoverCard />');
	});

	$effect(() => {
		if (ctx.visible && self) ctx.content = self;
	});

	const handleMouseenter: Handler<MouseEvent, HTMLDivElement> = (e) => {
		onMouseenter?.(e);
		ctx.hovered = true;
		ctx.timeout = null;
	};
	const handleMouseleave: Handler<MouseEvent, HTMLDivElement> = (e) => {
		onMouseleave?.(e);
		ctx.hovered = false;
		ctx.close();
	};
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
				ctx.visible = false;
			}
		}}
		use:usePortal={portalTarget}
		use:useActions={use}
		in:inFn={inConf}
		out:outFn={outConf}
		onmouseenter={handleMouseenter}
		onmouseleave={handleMouseleave}
		role="menu"
		tabindex={-1}
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
				ctx.visible = false;
			}
		}}
		use:usePortal={portalTarget}
		use:useActions={use}
		onmouseenter={handleMouseenter}
		onmouseleave={handleMouseleave}
		role="menu"
		tabindex={-1}
		{...attrs}
		{...props}
	>
		{@render children({ visible: ctx.visible })}
	</div>
{/if}
