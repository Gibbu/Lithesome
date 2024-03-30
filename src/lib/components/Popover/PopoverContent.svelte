<script lang="ts">
	import { context } from './Popover.svelte';
	import {
		clickOutside,
		anchorElement,
		portal,
		useActions,
		trap,
		getTransition,
		classProp,
		type Transition,
		type BaseProps
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
		...props
	}: Props = $props();

	const ctx = context();

	let contentCleanup = $state<ReturnType<typeof anchorElement> | undefined>(undefined);

	const _transition = getTransition(transition);
	const attrs = $derived({
		id: ctx.uid('content'),
		'aria-labelledby': ctx.uid('trigger'),
		role: 'menu',
		class: classProp(klass, { visible: ctx.visible }),
		'data-menucontent': ''
	});

	onMount(async () => {
		if (!ctx) log.error('<PopoverContent> Must be a direct child of <Popover />');
	});

	$effect(() => {
		if (ctx.visible && self) ctx.setContent(self);
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
</script>

{#if _transition}
	{#if ctx.visible}
		<div
			bind:this={self}
			use:clickOutside={{ exclude: [ctx.trigger], callback: ctx.close }}
			use:portal={portalTarget}
			use:useActions={use}
			use:trap={{
				allowOutsideClick: true,
				onDeactivate: () => {
					ctx.setVisible(false);
				}
			}}
			in:_transition.in.fn={_transition.in.params}
			out:_transition.out.fn={_transition.out.params}
			{...attrs}
			{...props}
		>
			{@render children({ visible: ctx.visible })}
		</div>
	{/if}
{:else if ctx.visible}
	<div
		bind:this={self}
		use:clickOutside={{ exclude: [ctx.trigger], callback: ctx.close }}
		use:portal={portalTarget}
		use:useActions={use}
		use:trap={{
			allowOutsideClick: true,
			onDeactivate: () => {
				ctx.setVisible(false);
			}
		}}
		{...attrs}
		{...props}
	>
		{@render children({ visible: ctx.visible })}
	</div>
{/if}
