<script lang="ts">
	import { context } from './Select.svelte';
	import { FloatingContent } from '$lib/internal/index.js';
	import type { SelectContentProps } from './types.js';

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
	}: SelectContentProps = $props();

	const ctx = context();
	const state = $derived({ visible: ctx.visible });
</script>

<FloatingContent
	{children}
	componentName="Select"
	visible={ctx.visible}
	{state}
	{ctx}
	{transition}
	{use}
	{sameWidth}
	{constrainViewport}
	{placement}
	{portalTarget}
	outsideCallback={() => ctx.close()}
	role="listbox"
	class={klass}
	hidden={!ctx.mounted || undefined}
	{...props}
/>
