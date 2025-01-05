<script lang="ts">
	import { stateValue, Element } from '$internal';
	import { useRadioItem } from './main.svelte.js';
	import type { RadioGroupItemProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		disabled = $bindable(false),
		transition,
		as = 'button',
		value,
		onClick,
		onKeydown,
		...props
	}: RadioGroupItemProps = $props();

	const ctx = useRadioItem(
		{
			value: stateValue(() => value),
			disabled: stateValue(() => disabled)
		},
		{
			onClick,
			onKeydown
		}
	);
</script>

<Element {transition} {as} {klass} bind:self {use} state={ctx.state} {children} {...ctx.attrs} {...props} />
