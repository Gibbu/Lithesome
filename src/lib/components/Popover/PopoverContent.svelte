<script lang="ts">
	import { context } from './Popover.svelte';
	import {
		clickOutside,
		anchorElement,
		portal,
		useActions,
		trap,
		getTransition,
		classProp
	} from '$lib/internal/index.js';
	import { log } from '$lib/internal/index.js';
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

	let contentCleanup = $state<ReturnType<typeof anchorElement> | undefined>(undefined);

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
		use:clickOutside={{
			exclude: ctx.trigger,
			callback: () => {
				ctx.close();
			}
		}}
		use:portal={portalTarget}
		use:useActions={use}
		use:trap={{
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
		use:clickOutside={{
			exclude: ctx.trigger,
			callback: () => {
				ctx.close();
			}
		}}
		use:portal={portalTarget}
		use:useActions={use}
		use:trap={{
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
