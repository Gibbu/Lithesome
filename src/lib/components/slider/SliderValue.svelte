<script lang="ts">
	import { Element, parseId, stateValue } from '$lib/internals/index.js';
	import { useSliderValue } from './state.svelte.js';

	import type { SliderValueProps } from '$lib/types/index.js';

	const uid = $props.id();

	let { id = parseId(uid), ref = $bindable(), custom, ...props }: SliderValueProps = $props();

	let ctx = useSliderValue({
		id: stateValue(() => id),
		ref: stateValue(() => ref!)
	});
</script>

<Element bind:ref {custom} {ctx} as="input" {...props} />
