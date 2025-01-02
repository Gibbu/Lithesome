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
		offset = 0,
		placement = 'bottom',
		constrainViewport = false,
		...props
	}: PopoverContentProps = $props();

	const ctx = usePopoverContent();
</script>

<FloatingContent
	{children}
	componentName="Popover"
	visible={ctx._root.$visible.val}
	{ctx}
	{transition}
	use={[
		[
			useTrap,
			{
				allowOutsideClick: true,
				onDeactivate: () => {
					ctx._root.$visible.val = false;
				}
			}
		],
		...use
	]}
	{sameWidth}
	{offset}
	{constrainViewport}
	{placement}
	{portalTarget}
	outsideCallback={() => ctx._root.close()}
	role="dialog"
	class={klass}
	{...props}
/>
