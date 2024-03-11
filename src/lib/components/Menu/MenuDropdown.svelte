<script lang="ts">
	import { context } from './Menu.svelte';
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
	import { onMount } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { visible: boolean }> {
		/**
		 * The `svelte/transtion` you wish to use.
		 *
		 * @see https://lithesome.dev/docs/transitions
		 */
		transition?: Transition;
		/** Apply the width of the `<MenuTrigger />` element to the dropdown. */
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
		...props
	} = $props<Props>();

	const API = context();

	const positionDropdown = () => {
		if (API.trigger) pos = getElementPosition(API.trigger);
	};

	onMount(() => {
		if (!API) log.error('<MenuDropdown> Must be a direct child of <Menu />');
	});

	const attrs = {
		id: API.uid('dropdown'),
		'aria-labelledby': API.uid('trigger'),
		role: 'menu'
	};

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
	const classProp = $derived(typeof klass === 'function' ? klass?.({ visible: API.visible }) : klass);
</script>

{#if _transition}
	{#if API.visible}
		<div
			transition:_transition.fn={_transition.params}
			use:useActions={use}
			class={classProp}
			use:clickOutside={{ exclude: [API.trigger], callback: API.close }}
			use:portal={portalTarget}
			{...attrs}
			{...props}
			style:left="{pos?.left}px"
			style:top="{pos?.top}px"
			style:width={stretch ? pos?.width + 'px' : undefined}
			style:position="absolute"
		>
			{@render children({ visible: API.visible })}
		</div>
	{/if}
{:else if API.visible}
	<div
		class={classProp}
		use:useActions={use}
		use:clickOutside={{ exclude: [API.trigger], callback: API.close }}
		use:portal={portalTarget}
		{...attrs}
		{...props}
		style:left="{pos?.left}px"
		style:top="{pos?.top}px"
		style:width={stretch ? pos?.width + 'px' : undefined}
		style:position="absolute"
	>
		{@render children({ visible: API.visible })}
	</div>
{/if}
