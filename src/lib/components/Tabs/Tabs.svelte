<script lang="ts">
	import { useActions, classProp } from '$internal';
	import type { TabsProps } from './types.js';
	import { createRootContext } from './main.svelte.js';

	let {
		children,
		use = [],
		class: klass,
		self = $bindable(),
		orientation = 'horizontal',
		value = $bindable(''),
		...props
	}: TabsProps = $props();

	const ctx = createRootContext({
		value,
		orientation,
		onContextChange(props) {
			value = props.value;
		}
	});

	$effect(() => {
		ctx.onComponentChange({ value, orientation });
	});
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props}>
	{@render children(ctx.state)}
</div>
