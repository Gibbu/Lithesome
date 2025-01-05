<script lang="ts" generics="T extends FloatingContext">
	import { classProp, log, useFloating, Element, type Props, type ContentProps } from '$internal';
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
		as = 'div',
		outsideCallback,
		ctx,
		componentName,
		...props
	}: ComponentProps = $props();

	const attrs = $derived.by(() => ({
		[`data-${componentName.toLowerCase()}content`]: '',
		id: ctx._root.uid('content'),
		'aria-labelledby': ctx._root.uid('trigger'),
		class: classProp(klass, ctx.state),
		...ctx.attrs
	}));

	$effect(() => {
		if (!visible) return;
		if (!ctx) throw log.error(`<${componentName}Content /> must be a child of <${componentName} />`);
		if (!self) throw log.error(`Cannot initialize content node of <${componentName}Content />.`);
		ctx._root.content = self;
	});
</script>

<Element
	{visible}
	{as}
	{transition}
	{klass}
	bind:self
	use={[
		[useOutside, { exclude: ctx._root.trigger, callback: () => outsideCallback() }],
		[usePortal, portalTarget],
		[
			useFloating,
			{
				anchor: ctx._root.trigger,
				arrow: ctx._root.arrow,
				sameWidth,
				constrainViewport,
				placement,
				offset
			}
		],
		...use
	]}
	state={ctx.state}
	{children}
	{...attrs}
	{...props}
/>
