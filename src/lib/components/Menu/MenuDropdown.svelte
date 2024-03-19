<script lang="ts">
	import { context } from './Menu.svelte';
	import {
		clickOutside,
		anchorElement,
		portal,
		useActions,
		getTransition,
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
		/** The element to portal the dropdown menu to. */
		portalTarget?: string | HTMLElement;
		/** The anchor point of the dropdown relative to the trigger. */
		placement?: Placement;
		/** Keeps the dropdown from ever growing outside of the viewport. */
		constrainViewport?: boolean;
		/** Makes the dropdown the same width as the trigger. */
		sameWidth?: boolean;
	}

	let {
		children,
		transition,
		use = [],
		portalTarget = 'body',
		class: klass,
		self,
		placement = 'bottom',
		constrainViewport,
		sameWidth = false,
		...props
	}: Props = $props();

	const API = context();

	let dropdownCleanup = $state<ReturnType<typeof anchorElement> | undefined>(undefined);

	const _transition = getTransition(transition);
	const classProp = $derived(typeof klass === 'function' ? klass({ visible: API.visible }) : klass);
	const attrs = $derived({
		id: API.uid('dropdown'),
		'aria-labelledby': API.uid('trigger'),
		role: 'menu',
		class: classProp,
		'data-menudropdown': ''
	});

	onMount(async () => {
		if (!API) log.error('<MenuDropdown> Must be a direct child of <Menu />');
	});

	$effect(() => {
		if (API.visible && self) API.setDropdown(self);
	});
	$effect(() => {
		if (API.visible && API.trigger && API.dropdown) {
			dropdownCleanup = anchorElement(API.trigger, API.dropdown, {
				placement,
				constrainViewport,
				sameWidth
			});
		}
		return () => {
			dropdownCleanup?.();
		};
	});
</script>

{#if _transition}
	{#if API.visible}
		<div
			bind:this={self}
			in:_transition.in.fn={_transition.in.params}
			out:_transition.out.fn={_transition.out.params}
			use:clickOutside={{ exclude: [API.trigger], callback: API.close }}
			use:portal={portalTarget}
			use:useActions={use}
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
		{...attrs}
		{...props}
	>
		{@render children({ visible: API.visible })}
	</div>
{/if}
