<script lang="ts">
	import { Element, parseId, stateValue } from '$lib/internals/index.js';
	import { usePinInput } from './state.svelte.js';

	import type { PinInputProps } from '$lib/types/index.js';

	const uid = $props.id();

	let { id = parseId(uid), ref = $bindable(), ...props }: PinInputProps = $props();

	let ctx = usePinInput({
		id: stateValue(() => id),
		ref: stateValue(() => ref!)
	});
</script>

<Element bind:ref {ctx} as="input" {...props} />
