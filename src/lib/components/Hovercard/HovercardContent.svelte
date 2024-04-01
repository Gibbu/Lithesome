<script lang="ts">
	import { context } from './Hovercard.svelte';
	import {
		clickOutside,
		anchorElement,
		portal,
		useActions,
		trap,
		getTransition,
		classProp,
		type Transition,
		type BaseProps,
		type Handler,
		type HandlerParam
	} from '$lib/internal/index.js';
	import { log } from '$lib/internal/index.js';
	import { onMount } from 'svelte';
	import type { Placement } from '@floating-ui/dom';

	interface Props extends BaseProps<HTMLDivElement, { visible: boolean }> {
		/**
		 * The `svelte/transtion` you wish to use.
		 *
		 * @see https://lithesome.dev/docs/api#transition-prop
		 */
		transition?: Transition;
		/** The element to portal the content menu to. */
		portalTarget?: string | HTMLElement;
		/** The anchor point of the content relative to the trigger. */
		placement?: Placement;
		/** Keeps the content from ever growing outside of the viewport. */
		constrainViewport?: boolean;
		/** Makes the content the same width as the trigger. */
		sameWidth?: boolean;
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

	const _transition = getTransition(transition);
	const attrs = $derived({
		id: ctx.uid('content'),
		'aria-labelledby': ctx.uid('trigger'),
		class: classProp(klass, { visible: ctx.visible }),
		'data-menucontent': '',
		role: 'menu',
		tabindex: -1
	} as const);

	onMount(async () => {
		if (!ctx) log.error('<HoverCardContent> Must be a direct child of <HoverCard />');
	});

	$effect(() => {
		if (ctx.visible && self) ctx.content = self;
	});
	$effect(() => {
		if (ctx.visible && ctx.trigger && ctx.content) {
			contentCleanup = anchorElement(ctx.trigger, ctx.content, {
				placement,
				constrainViewport,
				sameWidth
			});
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

{#if _transition}
	{#if ctx.visible}
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
			in:_transition.in.fn={_transition.in.params}
			out:_transition.out.fn={_transition.out.params}
			onmouseenter={handleMouseenter}
			onmouseleave={handleMouseleave}
			{...attrs}
			{...props}
		>
			{@render children({ visible: ctx.visible })}
		</div>
	{/if}
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
		{...attrs}
		{...props}
	>
		{@render children({ visible: ctx.visible })}
	</div>
{/if}
