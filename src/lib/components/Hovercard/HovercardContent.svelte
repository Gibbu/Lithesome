<script lang="ts">
	import { FloatingContent } from '$internal';
	import { useHovercardContent } from './main.svelte.js';
	import type { HovercardContentProps } from './types.js';

	let {
		children,
		transition,
		use = [],
		portalTarget = 'body',
		class: klass,
		self = $bindable(),
		as = 'div',
		placement = 'bottom',
		constrainViewport,
		sameWidth = false,
		offset = 0,
		...props
	}: HovercardContentProps = $props();

	const ctx = useHovercardContent();
</script>

<FloatingContent
	{children}
	componentName="Hovercard"
	visible={ctx._root.$visible.val}
	bind:self
	{as}
	{sameWidth}
	{transition}
	{constrainViewport}
	{placement}
	{portalTarget}
	{offset}
	{ctx}
	{use}
	outsideCallback={() => ctx._root.forceClose()}
	class={klass}
	{...props}
/>
