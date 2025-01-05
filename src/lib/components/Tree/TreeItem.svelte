<script lang="ts">
	import { Element, stateValue } from '$internal';
	import { createTreeItemContext } from './main.svelte.js';
	import type { TreeItemProps } from './types.js';

	let {
		children,
		class: klass,
		self = $bindable(),
		use = [],
		disabled = $bindable(false),
		id,
		onClick,
		transition,
		as = 'li',
		...props
	}: TreeItemProps = $props();

	const ctx = createTreeItemContext({
		id: stateValue(() => id),
		disabled: stateValue(() => disabled)
	});
</script>

<Element {transition} {as} {klass} bind:self {use} state={ctx.state} {children} {...ctx.attrs} {...props} />
