<script lang="ts">
	import { classProp, useActions } from '$internal';
	import { useSliderThumb } from './main.svelte.js';

	import type { SliderThumbProps } from './types.js';

	let { use = [], class: klass, self = $bindable(), onMousedown, onKeydown, ...props }: SliderThumbProps = $props();

	const ctx = useSliderThumb(self);
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props}></div>
