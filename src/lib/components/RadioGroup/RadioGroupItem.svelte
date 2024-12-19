<script lang="ts">
	import { Element, stateValue } from '$internal';
	import { useRadioItem } from './main.svelte.js';

	import type { RadioGroupItemProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		disabled = $bindable(false),
		value,
		as = 'button',
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

<Element {as} {klass} bind:self {use} state={ctx.state} {children} {...ctx.attrs} {...props} />
