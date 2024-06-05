<script lang="ts">
	import { context } from './Menu.svelte';
	import { FloatingContent } from '$internal';
	import type { MenuContentProps } from './types.js';

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
	}: MenuContentProps = $props();

	const ctx = context();
	const state = $derived({ visible: ctx.visible });
</script>

<FloatingContent
	{children}
	componentName="Menu"
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
	{...props}
/>
