<script lang="ts">
	import { Element, parseId, stateValue } from '$lib/internals/index.js';
	import { useSelectOption } from './state.svelte.js';

	import type { SelectOptionProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		children,
		custom,
		disabled = $bindable(false),
		value = $bindable(''),
		label = $bindable(''),
		ref = $bindable(),
		...props
	}: SelectOptionProps<typeof ctx.props, typeof ctx.state> & Record<string, any> = $props();

	let ctx = useSelectOption({
		id,
		ref: stateValue(() => ref!),
		disabled: stateValue(() => disabled),
		label: stateValue(() => label || ref?.dataset.label || ''),
		value: stateValue(() => value)
	});
</script>

<Element bind:ref as="button" {children} {custom} {ctx} {...props} />
