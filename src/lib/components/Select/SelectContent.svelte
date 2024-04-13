<script lang="ts">
	import { context } from './Select.svelte';
	import {
		clickOutside,
		anchorElement,
		portal,
		useActions,
		getTransition,
		classProp,
		type BaseProps,
		type ContentProps
	} from '$lib/internal/index.js';
	import { log } from '$lib/internal/index.js';
	import { onMount } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { visible: boolean }>, ContentProps {}

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
	let contentCleanup = $state<ReturnType<typeof anchorElement> | undefined>(undefined);

	const _transition = getTransition(transition);
	const attrs = $derived({
		id: ctx.uid('content'),
		'aria-labelledby': ctx.uid('trigger'),
		role: 'listbox',
		class: classProp(klass, { visible: ctx.visible }),
		'data-selectcontent': '',
		hidden: !ctx.mounted || undefined
	});

	onMount(() => {
		if (!ctx) log.error('<SelectContent> Must be a direct child of <Select />');
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

{#if _transition}
	{#if ctx.visible}
		<div
			bind:this={self}
			use:clickOutside={{ exclude: [ctx.trigger], callback: () => ctx.close() }}
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
		use:clickOutside={{ exclude: [ctx.trigger], callback: () => ctx.close() }}
		use:portal={portalTarget}
		use:useActions={use}
		{...attrs}
		{...props}
	>
		{@render children({ visible: ctx.visible })}
	</div>
{/if}
