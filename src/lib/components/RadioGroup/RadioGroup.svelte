<script lang="ts">
	import { useActions, classProp } from '$internal';
	import { createRootContext } from './main.svelte.js';
	import type { RadioGroupProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		self = $bindable(),
		value = $bindable(null),
		required = false,
		onChange,
		...props
	}: RadioGroupProps = $props();

	const ctx = createRootContext({
		value,
		required,
		onContextChange(props) {
			value = props.value;
			required = props.required;
		}
	});

	$effect(() => {
		ctx.onComponentChange({ required, value });
	});
</script>

<div bind:this={self} use:useActions={use} class={classProp(klass)} {...ctx.attrs} {...props}>
	{@render children({})}
</div>
