<script lang="ts">
	import { useActions, classProp } from '$internal';
	import { createRootContext } from './main.svelte.js';
	import type { SliderProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		self = $bindable(),
		min = $bindable(0),
		max = $bindable(100),
		step = $bindable(1),
		value = $bindable(50),
		orientation = $bindable('horizontal'),
		reverse = $bindable(false),
		disabled = $bindable(false),
		onMousedown,
		onClick,
		...props
	}: SliderProps = $props();

	const ctx = createRootContext({
		value,
		min,
		max,
		disabled,
		orientation,
		reverse,
		step,
		trackElement: self,
		onContextChange(props) {
			value = props.value;
			min = props.min;
			max = props.max;
			disabled = props.disabled;
			reverse = props.reverse;
		}
	});

	$effect(() => {
		ctx.onComponentChange({
			value,
			disabled,
			max,
			min,
			orientation,
			reverse,
			step,
			trackElement: self
		});
	});
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props}>
	{@render children(ctx.state)}
</div>
