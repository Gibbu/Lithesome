<script lang="ts">
	import { useActions, classProp } from '$internal';
	import { createRootContext } from './main.svelte.js';
	import type { PopoverProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		self = $bindable(),
		visible = $bindable(false),
		...props
	}: PopoverProps = $props();

	const ctx = createRootContext({
		visible,
		onContextChange(props) {
			visible = props.visible;
		}
	});
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props}>
	{@render children(ctx.state)}
</div>
