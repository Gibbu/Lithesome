<script lang="ts">
	import { Element } from '$internal';
	import { useCheckboxButton } from './main.svelte.js';

	import type { CheckboxButtonProps } from './types.js';

	let {
		children,
		as = 'button',
		class: klass,
		self = $bindable(),
		use = [],
		onClick,
		...props
	}: CheckboxButtonProps = $props();

	const ctx = useCheckboxButton({
		onClick
	});
</script>

<Element {as} {klass} bind:self {use} state={ctx.state} {children} {...ctx.attrs} {...props} />
