<script lang="ts" generics="T extends FloatingContext">
	import {
		useActions,
		classProp,
		log,
		useFloating,
		getTransition,
		type Props,
		type ContentProps,
		type HTMLActionArray
	} from '$internal';
	import { useOutside, usePortal } from '$lib/index.js';
	import type { FloatingContext } from './types.js';

	interface ComponentProps extends Props<HTMLDivElement>, ContentProps {
		componentName: string;
		ctx: T;
		visible: boolean;
		outsideCallback: () => void;
	}

	let {
		children,
		class: klass,
		use = [],
		visible = $bindable(),
		self = $bindable(),
		transition = $bindable(),
		sameWidth = $bindable(),
		constrainViewport = $bindable(),
		portalTarget = $bindable(),
		placement = $bindable(),
		offset = 0,
		outsideCallback,
		ctx,
		componentName,
		...props
	}: ComponentProps = $props();

	const attrs = $derived.by(() => ({
		[`data-${componentName.toLowerCase()}content`]: '',
		id: ctx.root.uid('content'),
		'aria-labelledby': ctx.root.uid('trigger'),
		class: classProp(klass, ctx.state),
		...ctx.attrs
	}));
	const { inTransition, outTransition } = getTransition(transition);

	$effect(() => {
		if (!visible) return;
		if (!ctx) throw log.error(`<${componentName}Content /> must be a child of <${componentName} />`);
		if (!self) throw log.error(`Cannot initialize content node of <${componentName}Content />.`);
		ctx.root.content = self;
	});

	const actions = $derived<HTMLActionArray>([
		[
			useFloating,
			{
				anchor: ctx.root.trigger,
				arrow: ctx.root.arrow,
				sameWidth,
				constrainViewport,
				placement,
				offset
			}
		],
		[useOutside, { exclude: ctx.root.trigger, callback: () => outsideCallback() }],
		[usePortal, portalTarget],
		...use
	]);
</script>

{#if visible && inTransition && outTransition}
	{@const { config: inConf, transition: inFn } = inTransition}
	{@const { config: outConf, transition: outFn } = outTransition}
	<div bind:this={self} use:useActions={actions} in:inFn={inConf} out:outFn={outConf} {...attrs} {...props}>
		{@render children?.({ visible: visible })}
	</div>
{:else if visible && inTransition && !outTransition}
	{@const { config: inConf, transition: inFn } = inTransition}
	<div bind:this={self} use:useActions={actions} in:inFn={inConf} {...attrs} {...props}>
		{@render children?.({ visible: visible })}
	</div>
{:else if visible && outTransition && !inTransition}
	{@const { config: outConf, transition: outFn } = outTransition}
	<div bind:this={self} use:useActions={actions} out:outFn={outConf} {...attrs} {...props}>
		{@render children?.({ visible: visible })}
	</div>
{:else if visible}
	<div
		bind:this={self}
		use:useFloating={{
			anchor: ctx.root.trigger,
			arrow: ctx.root.arrow,
			sameWidth,
			constrainViewport,
			placement,
			offset
		}}
		use:useOutside={{ exclude: ctx.root.trigger, callback: () => outsideCallback() }}
		use:usePortal={portalTarget}
		use:useActions={actions}
		{...attrs}
		{...props}
	>
		{@render children?.({ visible: visible })}
	</div>
{/if}
