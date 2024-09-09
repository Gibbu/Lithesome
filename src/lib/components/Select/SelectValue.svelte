<script lang="ts">
	import { useActions, classProp, stateValue } from '$internal';
	import { useSelectValue } from './main.svelte.js';
	import type { SelectValueProps } from './types.js';

	let {
		class: klass,
		use = [],
		self = $bindable(),
		placeholder = 'Select an option...',
		...props
	}: SelectValueProps = $props();

	const ctx = useSelectValue({ placeholder: stateValue(() => placeholder) });
</script>

<span bind:this={self} use:useActions={use} class={classProp(klass, ctx.state)} {...ctx.attrs} {...props}>
	{ctx.label}
</span>
