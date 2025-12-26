<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { Element, parseId } from '$lib/internals/index.js';
	import { createStepperRootContext } from './state.svelte.js';

	import type { StepperProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		disabled = $bindable(false),
		step,
		orientation = 'horizontal',
		children,
		onStepChange,
		onPrevStep,
		onNextStep,
		...props
	}: StepperProps<typeof ctx.state> = $props();

	let ctx = createStepperRootContext({
		id: stateValue(() => id),
		disabled: stateValue(() => disabled),
		step: stateValue(
			() => step!,
			(v) => {
				step = v;
				onStepChange?.(v);
			}
		),
		orientation: stateValue(() => orientation),
		onPrevStep,
		onNextStep
	});
</script>

{@render children?.(ctx.state)}
