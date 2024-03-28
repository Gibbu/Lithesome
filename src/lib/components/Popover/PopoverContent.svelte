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

	const API = context();

	let contentCleanup = $state<ReturnType<typeof anchorElement> | undefined>(undefined);

	const _transition = getTransition(transition);
	const attrs = $derived({
		id: API.uid('content'),
		'aria-labelledby': API.uid('trigger'),
		role: 'menu',
		class: classProp(klass, { visible: API.visible }),
		'data-menucontent': ''
	});

	onMount(async () => {
		if (!API) log.error('<PopoverContent> Must be a direct child of <Popover />');
	});

	$effect(() => {
		if (API.visible && self) API.setContent(self);
	});
	$effect(() => {
		if (API.visible && API.trigger && API.content) {
			contentCleanup = anchorElement(API.trigger, API.content, {
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
	{#if API.visible}
		<div
			bind:this={self}
			use:clickOutside={{ exclude: [API.trigger], callback: API.close }}
			use:portal={portalTarget}
			use:useActions={use}
			use:trap={{
				allowOutsideClick: true,
				onDeactivate: () => {
					API.setVisible(false);
				}
			}}
			in:_transition.in.fn={_transition.in.params}
			out:_transition.out.fn={_transition.out.params}
			{...attrs}
			{...props}
		>
			{@render children({ visible: API.visible })}
		</div>
	{/if}
{:else if API.visible}
	<div
		bind:this={self}
		use:clickOutside={{ exclude: [API.trigger], callback: API.close }}
		use:portal={portalTarget}
		use:useActions={use}
		use:trap={{
			allowOutsideClick: true,
			onDeactivate: () => {
				API.setVisible(false);
			}
		}}
		{...attrs}
		{...props}
	>
		{@render children({ visible: API.visible })}
	</div>
{/if}
