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
		...props
	}: TooltipContentProps = $props();

	const ctx = useTooltipContent();
</script>

<FloatingContent
	{children}
	componentName="Tooltip"
	visible={ctx.root.$visible.val}
	{ctx}
	{transition}
	{sameWidth}
	{constrainViewport}
	{placement}
	{portalTarget}
	outsideCallback={() => ctx.root.close()}
	role="dialog"
	class={klass}
	style="pointer-events: none;"
	{...props}
/>
