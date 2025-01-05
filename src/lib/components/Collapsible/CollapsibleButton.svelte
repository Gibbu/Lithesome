<script lang="ts">
	import { useCollapsibleButton } from './main.svelte.js';
	import { Element } from '$internal';
	import type { CollapsibleButtonProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		as = 'div',
		onClick,
		...props
	}: CollapsibleButtonProps = $props();

	const ctx = useCollapsibleButton({
		onClick
	});
</script>

<Element {as} {klass} bind:self {use} state={ctx.state} {children} {...ctx.attrs} {...props} />
