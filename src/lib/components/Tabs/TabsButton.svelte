<script lang="ts">
	import { stateValue, Element } from '$internal';
	import { useTabsButton } from './main.svelte.js';
	import type { TabsButtonProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		disabled = $bindable(false),
		as = 'button',
		transition,
		value,
		onClick,
		onKeydown,
		...props
	}: TabsButtonProps = $props();

	const ctx = useTabsButton(
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
