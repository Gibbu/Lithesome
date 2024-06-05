<script lang="ts" context="module">
	import { setupContext } from '$internal';
	import { SelectContext } from './context.svelte.js';

	export const { context, contextName } = setupContext<SelectContext>();
</script>

<script lang="ts" generics="ValueType">
	import { useActions, classProp } from '$internal';
	import { setContext, onMount, tick } from 'svelte';
	import type { SelectProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		value = $bindable(),
		self = $bindable(),
		onChange,
		...props
	}: SelectProps<ValueType> = $props();

	const multiple = Array.isArray(value);
	const ctx = new SelectContext<ValueType>(
		{ multiple },
		{
			onChange(val) {
				value = val;
			}
		}
	);
	setContext(contextName, ctx);

	onMount(async () => {
		await tick();
		ctx.setInitialSelected(value);
		ctx.close();
		ctx.mounted = true;
	});
</script>

<div
	bind:this={self}
	use:useActions={use}
	id={ctx.uid()}
	class={classProp(klass, { visible: ctx.visible && ctx.mounted })}
	data-select=""
	data-state={ctx.visible && ctx.mounted ? 'opened' : 'closed'}
	{...props}
>
	{@render children({ visible: ctx.visible && ctx.mounted })}
</div>
