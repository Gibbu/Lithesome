<script lang="ts" context="module">
	import { setupContext } from '$internal';
	import { ComboboxContext } from './context.svelte.js';

	export const { context, contextName } = setupContext<ComboboxContext>();
</script>

<script lang="ts" generics="ValueType">
	import { useActions, classProp } from '$internal';
	import { setContext, onMount, tick } from 'svelte';
	import type { ComboboxProps } from './types.js';

	let {
		children,
		use = [],
		class: klass,
		value = $bindable(),
		label = $bindable(),
		touched = $bindable(),
		self = $bindable(),
		onChange,
		...props
	}: ComboboxProps<ValueType> = $props();

	const multiple = Array.isArray(value);
	const ctx = new ComboboxContext<ValueType>(
		{ multiple },
		{
			onChange({ newValue, newTouched, newLabel }) {
				if (newValue) {
					value = newValue;
					onChange?.({ value: newValue });
				}
				if (newLabel && !multiple) {
					label = newLabel;
					onChange?.({ label: newLabel });
				}
				if (typeof newTouched === 'boolean') touched = newTouched;
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
