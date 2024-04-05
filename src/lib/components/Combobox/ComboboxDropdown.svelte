<script lang="ts">
	import { context } from './Combobox.svelte';
	import {
		clickOutside,
		anchorElement,
		portal,
		useActions,
		getTransition,
		classProp,
		type BaseProps,
		type DropdownProps
	} from '$lib/internal/index.js';
	import { log } from '$lib/internal/index.js';
	import { onMount } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { visible: boolean }>, DropdownProps {}

	let {
		children,
		transition,
		use = [],
		portalTarget = 'body',
		sameWidth = false,
		class: klass,
		self = $bindable(),
		placement = 'bottom',
		constrainViewport = false,
		...props
	}: Props = $props();

	const ctx = context();
	let dropdownCleanup = $state<ReturnType<typeof anchorElement> | undefined>(undefined);

	const _transition = getTransition(transition);
	const attrs = $derived({
		id: ctx.uid('dropdown'),
		'aria-labelledby': ctx.uid('trigger'),
		role: 'listbox',
		class: classProp(klass, { visible: ctx.visible }),
		'data-comboboxdropdown': '',
		hidden: !ctx.mounted || undefined
	});

	onMount(() => {
		if (!ctx) log.error('<ComboboxDropdown> Must be a direct child of <Combobox />');
	});

	$effect(() => {
		if (ctx.visible && self) ctx.dropdown = self;
	});
	$effect(() => {
		if (ctx.visible && ctx.trigger && ctx.dropdown) {
			dropdownCleanup = anchorElement(ctx.trigger, ctx.dropdown, {
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
	{#if ctx.visible}
		<div
			bind:this={self}
			use:clickOutside={{
				exclude: [ctx.trigger],
				callback: () => ctx.close()
			}}
			use:portal={portalTarget}
			use:useActions={use}
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
		use:clickOutside={{
			exclude: [ctx.trigger],
			callback: () => ctx.close()
		}}
		use:portal={portalTarget}
		use:useActions={use}
		{...attrs}
		{...props}
	>
		{@render children({ visible: ctx.visible })}
	</div>
{/if}
