<script lang="ts">
	import { useActions, classProp, Element } from '$internal';
	import { useMenuTrigger } from './main.svelte.js';
	import type { MenuTriggerProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		transition,
		as = 'div',
		...props
	}: MenuTriggerProps = $props();

	const ctx = useMenuTrigger();

	$effect(() => {
		if (self) ctx._root.registerTrigger(self);
	});
</script>

<Element {transition} {as} {klass} bind:self {use} state={ctx.state} {children} {...ctx.attrs} {...props} />
