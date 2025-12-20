<script lang="ts">
	import { Element, parseId, stateValue } from '$lib/internals/index.js';
	import { useSliderRange } from './state.svelte.js';

	import type { SliderRangeProps } from '$lib/types/index.js';

	const uid = $props.id();

	let { id = parseId(uid), ref = $bindable(), ...props }: SliderRangeProps<typeof ctx.state> = $props();

	let ctx = useSliderRange({
		id,
		ref: stateValue(() => ref!)
	});
</script>

<Element bind:ref {ctx} {...props} />
