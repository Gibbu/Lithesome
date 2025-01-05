<script lang="ts">
	import { Element } from '$internal';
	import { useTreeButton } from './main.svelte.js';
	import type { TreeButtonProps } from './types.js';

	let {
		children,
		class: klass,
		self = $bindable(),
		use = [],
		disabled = $bindable(false),
		id,
		as = 'button',
		transition,
		onClick,
		onKeydown,
		...props
	}: TreeButtonProps = $props();

	const ctx = useTreeButton({
		onClick,
		onKeydown
	});
</script>

<Element {transition} {as} {klass} bind:self {use} state={ctx.state} {children} {...ctx.attrs} {...props} />
