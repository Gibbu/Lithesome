<script lang="ts">
	import { classProp, FloatingContent } from '$internal';
	import { useHovercardContent } from './main.svelte.js';
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
		...props
	}: HovercardContentProps = $props();

	const ctx = useHovercardContent();
</script>

<FloatingContent
	{children}
	componentName="Hovercard"
	visible={ctx.root.$visible.val}
	bind:self
	bind:sameWidth
	bind:transition
	bind:constrainViewport
	bind:placement
	bind:portalTarget
	{ctx}
	{use}
	outsideCallback={() => ctx.root.forceClose()}
	role="listbox"
	class={classProp(klass, ctx.state)}
	{...props}
/>
