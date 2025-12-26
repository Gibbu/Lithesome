<script lang="ts">
	import { Element, parseId, stateValue } from '$lib/internals/index.js';
	import { useStepperItem } from './state.svelte.js';

	import type { StepperItemProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		ref = $bindable(),
		name,
		canGoNext,
		children,
		custom,
		...props
	}: StepperItemProps<typeof ctx.props, typeof ctx.state> = $props();

	let ctx = useStepperItem({
		id: stateValue(() => id),
		ref: stateValue(() => ref!),
		name: stateValue(() => name),
		canGoNext
	});
</script>

<Element bind:ref {children} {custom} visible={ctx._root.CurrentItem?.name === name} {ctx} {...props} />
