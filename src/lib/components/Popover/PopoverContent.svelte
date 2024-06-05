<script lang="ts">
	import { context } from './Popover.svelte';
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

	const ctx = context();
	const state = $derived({ visible: ctx.visible });
</script>

<FloatingContent
	{children}
	componentName="Popover"
	visible={ctx.visible}
	{state}
	{ctx}
	{transition}
	use={[
		[
			useTrap,
			{
				allowOutsideClick: true,
				onDeactivate: () => {
					ctx.visible = false;
				}
			}
		],
		...use
	]}
	{sameWidth}
	{constrainViewport}
	{placement}
	{portalTarget}
	outsideCallback={() => ctx.close()}
	role="listbox"
	class={klass}
	{...props}
/>
