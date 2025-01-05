<script lang="ts">
	import { Element, stateValue } from '$internal';
	import { createTreeRootContext } from './main.svelte.js';
	import type { TreeProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		value = $bindable(),
		forceVisible = false,
		as = 'ul',
		transition,
		...props
	}: TreeProps = $props();

	const ctx = createTreeRootContext({
		value: stateValue(
			() => value || [],
			(v) => (value = v)
		),
		forceVisible: stateValue(() => forceVisible)
	});
</script>

<Element {transition} {as} {klass} bind:self {use} state={ctx.state} {children} {...ctx.attrs} {...props} />
