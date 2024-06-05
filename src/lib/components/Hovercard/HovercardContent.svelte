<script lang="ts">
	import { context } from './Hovercard.svelte';
	import { classProp, FloatingContent } from '$internal';
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

	const handleMouseenter: typeof onMouseenter = (e) => {
		onMouseenter?.(e);
		ctx.hovered = true;
		ctx.timeout = null;
	};
	const handleMouseleave: typeof onMouseleave = (e) => {
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
