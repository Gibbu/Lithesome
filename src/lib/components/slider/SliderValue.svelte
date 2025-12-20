<script lang="ts">
	import { Element, parseId, stateValue } from '$lib/internals/index.js';
	import { useSliderValue } from './state.svelte.js';

	import type { SliderValueProps } from '$lib/types/index.js';

	const uid = $props.id();

	let { id = parseId(uid), ref = $bindable(), ...props }: SliderValueProps<typeof ctx.state> = $props();

	let ctx = useSliderValue({
		id,
		ref: stateValue(() => ref!)
	});
</script>

<Element bind:ref {ctx} as="input" {...props} />
