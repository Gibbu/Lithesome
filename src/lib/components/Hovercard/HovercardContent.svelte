<script lang="ts">
	import { context } from './Hovercard.svelte';
	import { classProp, FloatingContent, type Handler } from '$lib/internal/index.js';
	import type { HovercardContentProps } from './types.js';

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
		onMouseenter,
		onMouseleave,
		...props
	}: HovercardContentProps = $props();

	const ctx = context();
	const state = $derived({ visible: ctx.visible });

	const handleMouseenter: Handler<MouseEvent, HTMLDivElement> = (e) => {
		onMouseenter?.(e);
		ctx.hovered = true;
		ctx.timeout = null;
	};
	const handleMouseleave: Handler<MouseEvent, HTMLDivElement> = (e) => {
		onMouseleave?.(e);
		ctx.hovered = false;
		ctx.close();
	};
</script>

<FloatingContent
	{children}
	componentName="Hovercard"
	visible={ctx.visible}
	bind:self
	bind:sameWidth
	bind:transition
	bind:constrainViewport
	bind:placement
	bind:portalTarget
	{state}
	{ctx}
	{use}
	outsideCallback={() => ctx.forceClose()}
	role="listbox"
	class={classProp(klass, state)}
	onmouseenter={handleMouseenter}
	onmouseleave={handleMouseleave}
	{...props}
/>
