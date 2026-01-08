<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { Element, parseId } from '$lib/internals/index.js';
	import { useStepperLink } from './state.svelte.js';

	import type { StepperLinkProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		ref = $bindable(),
		disabled = $bindable(false),
		skipCanDoNext = false,
		item,
		children,
		custom,
		...props
	}: StepperLinkProps<typeof ctx.props> = $props();

	let ctx = useStepperLink({
		id: stateValue(() => id),
		ref: stateValue(() => ref!),
		disabled: stateValue(() => disabled),
		item: stateValue(() => item),
		skipCanDoNext: stateValue(() => skipCanDoNext)
	});
</script>

<Element bind:ref as="button" {children} {custom} {ctx} {...props} />
