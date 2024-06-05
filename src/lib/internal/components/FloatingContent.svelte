<script lang="ts">
	import {
		useActions,
		classProp,
		log,
		FloatingContext,
		useFloating,
		getTransition,
		type Props,
		type ContentProps
	} from '$internal';
	import { useOutside } from '$lib/actions/outside.js';
	import { usePortal } from '$lib/actions/portal.js';

	interface ComponentProps extends Props<HTMLDivElement>, ContentProps {
		componentName: string;
		ctx: FloatingContext;
		state?: Record<string, any>;
		visible: boolean;
		outsideCallback: () => void;
	}

	let {
		children,
		class: klass,
		use = [],
		visible = $bindable(),
		self = $bindable(),
		state = $bindable(),
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

	const attrs = $derived({
		[`data-${componentName.toLowerCase()}content`]: '',
		id: ctx.uid('content'),
		'aria-labelledby': ctx.uid('trigger'),
		class: classProp(klass, state)
	});
	const { inTransition, outTransition } = getTransition(transition);

	$effect(() => {
		if (!visible) return;
		if (!ctx) throw log.error(`<${componentName}Content /> must be a child of <${componentName} />`);
		if (!self) throw log.error(`Cannot initialize content node of <${componentName}Content />.`);
		ctx.content = self;
	});
</script>

{#if inTransition && outTransition && visible}
	{@const { config: inConf, transition: inFn } = inTransition}
	{@const { config: outConf, transition: outFn } = outTransition}
	<div
		bind:this={self}
		use:useFloating={{ anchor: ctx.trigger, arrow: ctx.arrow, sameWidth, constrainViewport, placement }}
		use:useOutside={{ exclude: ctx.trigger, callback: () => outsideCallback() }}
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
		use:useFloating={{ anchor: ctx.trigger, arrow: ctx.arrow, sameWidth, constrainViewport, placement }}
		use:useOutside={{ exclude: ctx.trigger, callback: () => outsideCallback() }}
		use:usePortal={portalTarget}
		use:useActions={use}
		{...attrs}
		{...props}
	>
		{@render children({ visible: visible })}
	</div>
{/if}
