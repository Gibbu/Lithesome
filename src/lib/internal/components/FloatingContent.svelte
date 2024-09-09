<script lang="ts" generics="T extends FloatingContext">
	import { useActions, classProp, log, useFloating, getTransition, type Props, type ContentProps } from '$internal';
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
</script>

{#if inTransition && outTransition && visible}
	{@const { config: inConf, transition: inFn } = inTransition}
	{@const { config: outConf, transition: outFn } = outTransition}
	<div
		bind:this={self}
		use:useFloating={{ anchor: ctx.root.trigger, arrow: ctx.root.arrow, sameWidth, constrainViewport, placement }}
		use:useOutside={{ exclude: ctx.root.trigger, callback: () => outsideCallback() }}
		use:usePortal={portalTarget}
		use:useActions={use}
		in:inFn={inConf}
		out:outFn={outConf}
		{...attrs}
		{...props}
	>
		{@render children({ visible: visible })}
	</div>
{:else if visible}
	<div
		bind:this={self}
		use:useFloating={{ anchor: ctx.root.trigger, arrow: ctx.root.arrow, sameWidth, constrainViewport, placement }}
		use:useOutside={{ exclude: ctx.root.trigger, callback: () => outsideCallback() }}
		use:usePortal={portalTarget}
		use:useActions={use}
		{...attrs}
		{...props}
	>
		{@render children({ visible: visible })}
	</div>
{/if}
