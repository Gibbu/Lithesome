<script lang="ts" context="module">
	import { setupContext } from '$internal';
	import { RadiogroupContext } from './context.svelte.js';

	export const { context, contextName } = setupContext<RadiogroupContext>();
</script>

<script lang="ts">
	import { useActions, classProp } from '$internal';
	import { setContext } from 'svelte';
	import type { RadioGroupProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		self = $bindable(),
		value = $bindable(),
		required = $bindable(false),
		onChange,
		...props
	}: RadioGroupProps = $props();

	const ctx = new RadiogroupContext(
		{ value },
		{
			onChange(val) {
				value = val;
				onChange?.(val);
			}
		}
	);

	setContext(contextName, ctx);
</script>

<div
	bind:this={self}
	use:useActions={use}
	id={ctx.uid()}
	class={classProp(klass)}
	role="radiogroup"
	aria-required={required}
	data-radiogroup=""
	{...props}
>
	{@render children({})}
</div>
