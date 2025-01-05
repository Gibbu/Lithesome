<script lang="ts">
	import { stateValue, Element } from '$internal';
	import { useSelectValue } from './main.svelte.js';
	import type { SelectValueProps } from './types.js';

	let {
		class: klass,
		use = [],
		self = $bindable(),
		as = 'span',
		transition,
		placeholder = 'Select an option...',
		...props
	}: SelectValueProps = $props();

	const ctx = useSelectValue({ placeholder: stateValue(() => placeholder) });
</script>

<Element {transition} {as} {klass} bind:self {use} state={ctx.state} {...ctx.attrs} {...props}>
	{ctx.label}
</Element>
