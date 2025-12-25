<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { Element, parseId } from '$lib/internals/index.js';
	import { useStepperJump } from './state.svelte.js';

	import type { StepperJumpProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		ref = $bindable(),
		disabled = $bindable(false),
		skipCanDoNext = false,
		name,
		children,
		custom,
		...props
	}: StepperJumpProps<typeof ctx.props, typeof ctx.state> = $props();

	let ctx = useStepperJump({
		id: stateValue(() => id),
		ref: stateValue(() => ref!),
		disabled: stateValue(() => disabled),
		name: stateValue(() => name),
		skipCanDoNext: stateValue(() => skipCanDoNext)
	});
</script>

<Element bind:ref as="button" {children} {custom} {ctx} {...props} />
