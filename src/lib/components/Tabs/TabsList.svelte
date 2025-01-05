<script lang="ts">
	import { Element } from '$internal';
	import { useTabsList } from './main.svelte.js';
	import type { TabsListProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		transition,
		as = 'div',
		...props
	}: TabsListProps = $props();

	const ctx = useTabsList();
</script>

<Element {transition} {as} {klass} bind:self {use} state={ctx.state} {children} {...ctx.attrs} {...props} />
