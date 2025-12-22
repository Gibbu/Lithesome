<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { Element, parseId } from '$lib/internals/index.js';
	import { useRadioGroupItem } from './state.svelte.js';

	import type { RadioGroupItemProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		custom,
		ref = $bindable(),
		value,
		disabled = $bindable(false),
		...props
	}: RadioGroupItemProps<typeof ctx.props, typeof ctx.state> = $props();

	let ctx = useRadioGroupItem({
		id: stateValue(() => id),
		ref: stateValue(() => ref!),
		value: stateValue(() => value),
		disabled: stateValue(() => disabled)
	});
</script>

<Element bind:ref {children} {custom} {ctx} {...props} />
