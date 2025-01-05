<script lang="ts">
	import { useActions, classProp, stateValue, Element } from '$internal';
	import { useTabsContent } from './main.svelte.js';
	import type { TabsContentProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		as = 'div',
		transition,
		value,
		...props
	}: TabsContentProps = $props();

	const ctx = useTabsContent({
		value: stateValue(() => value)
	});
</script>

<Element {transition} {as} {klass} bind:self {use} state={ctx.state} {children} {...ctx.attrs} {...props} />
