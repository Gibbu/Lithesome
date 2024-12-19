<script lang="ts">
	import { stateValue, Element } from '$internal';
	import { useComboboxOption } from './main.svelte.js';

	import type { ComboboxOptionProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		value,
		label,
		self = $bindable(),
		disabled = $bindable(false),
		as = 'button',
		onClick,
		onMouseover,
		...props
	}: ComboboxOptionProps = $props();

	const ctx = useComboboxOption(
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

<Element {as} {klass} bind:self {use} state={ctx.state} {children} {...ctx.attrs} {...props} />
