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
		...props
	}: MenuContentProps = $props();

	const ctx = useMenuContent();
</script>

<FloatingContent
	{children}
	componentName="Menu"
	visible={ctx.root.visible.val}
	state={ctx.state}
	{ctx}
	{transition}
	{use}
	{sameWidth}
	{constrainViewport}
	{placement}
	{portalTarget}
	outsideCallback={() => ctx.root.close()}
	role="listbox"
	class={klass}
	{...props}
/>
