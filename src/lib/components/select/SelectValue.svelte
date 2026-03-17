<script lang="ts">
	import { Element, parseId, stateValue } from '$lib/internals/index.js';
	import { useSelectValue } from './state.svelte.js';

	import type { SelectValueProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		ref = $bindable(),
		placeholder = $bindable('Select an option...'),
		children,
		custom,
		...props
	}: SelectValueProps<typeof ctx.props> & Record<string, any> = $props();

	let ctx = useSelectValue({
		id: stateValue(() => id),
		ref: stateValue(() => ref!),
		placeholder: stateValue(() => placeholder || 'Select an option...')
	});
</script>

<Element bind:ref {custom} {ctx} {...props} as="span">
	{ctx.state.placeholderVisible ? placeholder : ctx.state.selectedLabels.join(', ')}
</Element>
