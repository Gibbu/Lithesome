<script lang="ts">
	import { context } from './Combobox.svelte';
	import { classProp, FloatingContent } from '$lib/internal/index.js';
	import type { ComboboxContentProps } from './types.js';

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
	}: ComboboxContentProps = $props();

	const ctx = context();
	const state = $derived({ visible: ctx.visible });
</script>

<FloatingContent
	{children}
	componentName="Select"
	visible={ctx.visible}
	bind:self
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
	class={classProp(klass, state)}
	hidden={!ctx.mounted || undefined}
	{...props}
/>
