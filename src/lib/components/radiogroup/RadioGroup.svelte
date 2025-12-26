<script lang="ts">
	import { stateValue } from '$lib/internals/context.svelte.js';
	import { Element, parseId } from '$lib/internals/index.js';
	import { createRadioGroupRootContext } from './state.svelte.js';

	import type { RadioGroupProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		value = $bindable(''),
		disabled = $bindable(false),
		ref = $bindable(),
		onValueChanged,
		children,
		custom,
		...props
	}: RadioGroupProps<typeof ctx.props, typeof ctx.state> = $props();

	let ctx = createRadioGroupRootContext({
		id: stateValue(() => id),
		ref: stateValue(() => ref!),
		value: stateValue(
			() => value,
			(v) => {
				value = v;
				onValueChanged?.(v);
			}
		),
		disabled: stateValue(() => disabled)
	});
</script>

<Element bind:ref {children} {custom} {ctx} {...props} />
