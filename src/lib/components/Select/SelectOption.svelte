<script lang="ts">
	import { stateValue, Element } from '$internal';
	import { useSelectOption } from './main.svelte.js';
	import type { SelectOptionProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		value,
		label,
		transition,
		as = 'button',
		self = $bindable(),
		disabled = $bindable(false),
		onClick,
		onMouseover,
		...props
	}: SelectOptionProps = $props();

	const ctx = useSelectOption(
		{
			disabled: stateValue(() => disabled),
			value: stateValue(() => value),
			label: stateValue(() => label || self?.textContent?.trim() || '')
		},
		{
			onClick,
			onMouseover
		}
	);
</script>

<Element {transition} {as} {klass} bind:self {use} state={ctx.state} {children} {...ctx.attrs} {...props} />
