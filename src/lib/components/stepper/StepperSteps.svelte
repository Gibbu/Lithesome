<script lang="ts">
	import { Element, parseId, stateValue } from '$lib/internals/index.js';
	import { useStepperSteps } from './state.svelte.js';

	import type { StepperStepsProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		ref = $bindable(),
		children,
		custom,
		...props
	}: StepperStepsProps<typeof ctx.props, typeof ctx.state> = $props();

	let ctx = useStepperSteps({
		id: stateValue(() => id),
		ref: stateValue(() => ref!)
	});
</script>

<Element bind:ref {children} {custom} {ctx} {...props} />
