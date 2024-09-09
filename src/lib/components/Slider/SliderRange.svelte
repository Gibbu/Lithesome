<script lang="ts">
	import { classProp, useActions } from '$internal';
	import { useSliderRange } from './main.svelte.js';

	import type { SliderRangeProps } from './types.js';

	let { use = [], class: klass, self = $bindable(), ...props }: SliderRangeProps = $props();

	const ctx = useSliderRange();
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props}></div>
