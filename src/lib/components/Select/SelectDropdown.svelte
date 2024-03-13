<script lang="ts">
	import { context } from './Select.svelte';
	import {
		clickOutside,
		getElementPosition,
		portal,
		useActions,
		getTransition,
		type Transition,
		type BaseProps
	} from '$lib/internal/index.js';
	import { log } from '$lib/internal/index.js';
	import { onMount, tick } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { visible: boolean }> {
		/**
		 * The `svelte/transtion` you wish to use.
		 *
		 * @see https://lithesome.dev/docs/api#transition
		 */
		transition?: Transition;
		/** Apply the width of the `<SelecTrigger />` element to the dropdown. */
		stretch?: boolean;
		/** The element to portal the dropdown menu to. */
		portalTarget?: string | HTMLElement;
	}

	let {
		children,
		transition,
		use = [],
		portalTarget = 'body',
		stretch = false,
		class: klass,
		self,
		...props
	} = $props<Props>();

	const API = context();

	const positionDropdown = () => {
		if (API.trigger) pos = getElementPosition(API.trigger);
	};

	onMount(() => {
		if (!API) log.error('<SelectDropdown> Must be a direct child of <Menu />');
	});

	let pos = $state<ReturnType<typeof getElementPosition>>();

	$effect(() => {
		if (API.visible && API.trigger) {
			pos = getElementPosition(API.trigger);
			window.addEventListener('resize', positionDropdown);
		}
		return () => {
			window.removeEventListener('resize', positionDropdown);
		};
	});

	const _transition = getTransition(transition);
	const classProp = $derived(typeof klass === 'function' ? klass({ visible: API.visible }) : klass);
	const attrs = $derived({
		id: API.uid('dropdown'),
		'aria-labelledby': API.uid('trigger'),
		role: 'listbox',
		class: classProp,
		'data-selectdropdown': '',
		style: pos
			? `position: absolute; left: ${pos.left}px; top: ${pos.top}px; ${stretch ? `width: ${pos.width}px` : ''}`
			: undefined
	});
</script>

{#if _transition}
	{#if API.visible}
		<div
			bind:this={self}
			transition:_transition.fn={_transition.params}
			use:clickOutside={{ exclude: [API.trigger], callback: API.close }}
			use:portal={portalTarget}
			use:useActions={use}
			hidden={!API.mounted || undefined}
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
		hidden={!API.mounted || undefined}
		{...attrs}
		{...props}
	>
		{@render children({ visible: API.visible })}
	</div>
{/if}
