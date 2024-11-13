<script lang="ts">
	import { useActions, classProp, stateValue } from '$internal';
	import { createCollapsibleRootContext } from './main.svelte.js';
	import type { CollapsibleProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		visible = $bindable(false),
		self = $bindable(),
		disabled = $bindable(false),
		onChange,
		...props
	}: CollapsibleProps = $props();

	const ctx = createCollapsibleRootContext({
		visible: stateValue(
			() => visible,
			(v) => {
				visible = v;
				onChange?.(v);
			}
		),
		disabled: stateValue(() => disabled)
	});
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props}>
	{@render children?.(ctx.state)}
</div>
