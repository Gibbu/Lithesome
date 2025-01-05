<script lang="ts">
	import { Element } from '$internal';
	import { useSliderRange } from './main.svelte.js';

	import type { SliderRangeProps } from './types.js';

	let { use = [], class: klass, self = $bindable(), as = 'div', transition, ...props }: SliderRangeProps = $props();

	const ctx = useSliderRange();
</script>

<Element {transition} {as} {klass} bind:self {use} state={ctx.state} {...ctx.attrs} {...props} />
