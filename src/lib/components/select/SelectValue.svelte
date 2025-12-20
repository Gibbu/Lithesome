<script lang="ts">
	import { Element, parseId, stateValue } from '$lib/internals/index.js';
	import { useSelectValue } from './state.svelte.js';

	import type { SelectValueProps } from '$lib/types/index.js';

	const uid = $props.id();

	let {
		id = parseId(uid),
		ref = $bindable(),
		placeholder = $bindable(''),
		...props
	}: SelectValueProps<typeof ctx.props, typeof ctx.state> & Record<string, any> = $props();

	let ctx = useSelectValue({
		id,
		placeholder: stateValue(() => placeholder || 'Select an option...')
	});
</script>

<Element bind:ref {ctx} {...props}>
	{ctx.label}
</Element>
