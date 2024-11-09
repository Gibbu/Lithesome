<script lang="ts">
	import { FloatingContent } from '$internal';
	import { useSelectContent } from './main.svelte.js';
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

	const ctx = useSelectContent();
</script>

<FloatingContent
	{children}
	componentName="Select"
	visible={ctx.root.SuperVisible}
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
