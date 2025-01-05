<script lang="ts">
	import { useTooltipContent } from './main.svelte.js';
	import { FloatingContent } from '$internal';
	import type { TooltipContentProps } from './types.js';

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
		as = 'div',
		offset = 0,
		...props
	}: TooltipContentProps = $props();

	const ctx = useTooltipContent();
</script>

<FloatingContent
	{children}
	componentName="Tooltip"
	visible={ctx._root.$visible.val}
	{as}
	{ctx}
	{transition}
	{sameWidth}
	{constrainViewport}
	{placement}
	{portalTarget}
	{offset}
	outsideCallback={() => ctx._root.close()}
	role="tooltip"
	class={klass}
	style="pointer-events: none;"
	{...props}
/>
