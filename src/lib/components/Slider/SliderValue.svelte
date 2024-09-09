<script lang="ts">
	import { classProp, useActions } from '$internal';
	import { useSliderValue } from './main.svelte.js';

	import type { SliderValueProps } from './types.js';

	let { use = [], class: klass, self = $bindable(), ...props }: SliderValueProps = $props();

	const ctx = useSliderValue();
</script>

<input
	type="range"
	bind:this={self}
	use:useActions={use}
	class={classProp(klass, ctx.state)}
	{...ctx.attrs}
	{...props}
/>
