<script lang="ts">
	import { usePopoverContent } from './main.svelte.js';
	import { FloatingContent } from '$internal';
	import { useTrap } from '$lib/index.js';
	import type { PopoverContentProps } from './types.js';

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
	}: PopoverContentProps = $props();

	const ctx = usePopoverContent();
</script>

<FloatingContent
	{children}
	componentName="Popover"
	visible={ctx.root.$visible.val}
	{ctx}
	{transition}
	use={[
		[
			useTrap,
			{
				allowOutsideClick: true,
				onDeactivate: () => {
					ctx.root.$visible.val = false;
				}
			}
		],
		...use
	]}
	{sameWidth}
	{constrainViewport}
	{placement}
	{portalTarget}
	outsideCallback={() => ctx.root.close()}
	role="dialog"
	class={klass}
	{...props}
/>
