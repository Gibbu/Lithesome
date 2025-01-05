<script lang="ts">
	import { stateValue, Element } from '$internal';
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
		as = 'div',
		transition,
		onMousedown,
		onClick,
		...props
	}: SliderProps = $props();

	const ctx = createRootContext(
		{
			value: stateValue(
				() => value,
				(v) => (value = v)
			),
			min: stateValue(() => min),
			max: stateValue(() => max),
			disabled: stateValue(
				() => disabled,
				(v) => (disabled = v)
			),
			orientation: stateValue(() => orientation),
			reverse: stateValue(() => reverse),
			step: stateValue(() => step),
			trackElement: stateValue(() => self)
		},
		{
			onClick,
			onMousedown
		}
	);
</script>

<Element {transition} {as} {klass} bind:self {use} state={ctx.state} {children} {...ctx.attrs} {...props} />
