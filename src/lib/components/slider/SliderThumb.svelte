<script lang="ts">
	import { Element, parseId, stateValue } from '$lib/internals/index.js';
	import { useSliderThumb } from './state.svelte.js';

	import type { SliderThumbProps } from '$lib/types/index.js';

	const uid = $props.id();

	let { id = parseId(uid), ref = $bindable(), ...props }: SliderThumbProps<typeof ctx.state> = $props();

	let ctx = useSliderThumb({
		id: stateValue(() => id),
		ref: stateValue(() => ref!)
	});
</script>

<Element bind:ref {ctx} {...props} />
