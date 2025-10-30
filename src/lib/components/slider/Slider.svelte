<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { Element } from '$lib/internals/index.js';
	import { parseId } from '$lib/internals/utils.svelte.js';
	import { createSliderRootContext } from './state.svelte.js';

	import type { SliderProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		children,
		custom,
		id = parseId(uid),
		min = $bindable(0),
		max = $bindable(100),
		step = $bindable(1),
		value = $bindable(50),
		orientation = $bindable('horizontal'),
		reverse = $bindable(false),
		disabled = $bindable(false),
		ref = $bindable(),
		...props
	}: SliderProps<typeof ctx.state> = $props();

	let ctx = createSliderRootContext({
		id,
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
		step: stateValue(() => step)
	});
</script>

<Element bind:ref {children} {custom} {ctx} {...props} />
