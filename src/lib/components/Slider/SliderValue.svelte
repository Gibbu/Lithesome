<script lang="ts">
	import { classProp, useActions } from '$internal';
	import { context } from './Slider.svelte';

	import type { SliderValueProps } from './types.js';

	let { use = [], class: klass, self = $bindable(), ...props }: SliderValueProps = $props();

	const ctx = context();
</script>

<input
	type="range"
	bind:this={self}
	use:useActions={use}
	id={ctx.uid('value')}
	class={classProp(klass, { value: ctx.value, percentage: ctx.Percentage })}
	min={ctx.min}
	max={ctx.max}
	step={ctx.step}
	bind:value={ctx.value}
	aria-hidden="false"
	data-slidervalue=""
	style="display: none"
	{...props}
/>
