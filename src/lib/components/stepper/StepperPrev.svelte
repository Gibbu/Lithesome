<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { Element, parseId } from '$lib/internals/index.js';
	import { useStepperPrev } from './state.svelte.js';

	import type { StepperPrevProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		ref = $bindable(),
		disabled = $bindable(false),
		children,
		custom,
		...props
	}: StepperPrevProps<typeof ctx.props, typeof ctx.state> = $props();

	let ctx = useStepperPrev({
		id: stateValue(() => id),
		ref: stateValue(() => ref!),
		disabled: stateValue(() => disabled)
	});
</script>

<Element bind:ref as="button" {children} {custom} {ctx} {...props} />
