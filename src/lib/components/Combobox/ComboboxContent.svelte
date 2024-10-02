<script lang="ts">
	import { FloatingContent } from '$internal';
	import { useComboboxContent } from './main.svelte.js';
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

	const ctx = useComboboxContent();
</script>

<FloatingContent
	{children}
	componentName="Combobox"
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
