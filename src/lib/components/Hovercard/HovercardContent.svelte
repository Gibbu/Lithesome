<script lang="ts">
	import { context } from './Hovercard.svelte';
	import {
		clickOutside,
		anchorElement,
		portal,
		useActions,
		getTransition,
		classProp,
		type BaseProps,
		type Handler,
		type HandlerParam,
		type ContentProps
	} from '$lib/internal/index.js';
	import { log } from '$lib/internal/index.js';
	import { onMount } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { visible: boolean }>, ContentProps {
		onMouseenter?: Handler<MouseEvent, HTMLDivElement>;
		onMouseleave?: Handler<MouseEvent, HTMLDivElement>;
	}

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
	}: Props = $props();

	const ctx = context();

	let contentCleanup = $state<ReturnType<typeof anchorElement> | undefined>(undefined);

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

	const handleMouseenter = (e: HandlerParam<MouseEvent, HTMLDivElement>) => {
		onMouseenter?.(e);
		ctx.hovered = true;
		ctx.timeout = null;
	};
	const handleMouseleave = (e: HandlerParam<MouseEvent, HTMLDivElement>) => {
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
		use:clickOutside={{
			exclude: [ctx.trigger],
			callback: () => {
				ctx.visible = false;
			}
		}}
		use:portal={portalTarget}
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
		use:clickOutside={{
			exclude: [ctx.trigger],
			callback: () => {
				ctx.visible = false;
			}
		}}
		use:portal={portalTarget}
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
