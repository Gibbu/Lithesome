<script lang="ts">
	import { FloatingContent } from '$internal';
	import { useMenuContent } from './main.svelte.js';
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
		offset = 0,
		...props
	}: MenuContentProps = $props();

	const ctx = useMenuContent();
</script>

<FloatingContent
	{children}
	componentName="Menu"
	visible={ctx._root.$visible.val}
	bind:self
	{ctx}
	{transition}
	{use}
	{sameWidth}
	{offset}
	{constrainViewport}
	{placement}
	{portalTarget}
	outsideCallback={() => ctx._root.close()}
	role="listbox"
	class={klass}
	{...props}
/>
