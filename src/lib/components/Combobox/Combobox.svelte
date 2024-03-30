<script lang="ts" context="module">
	import { getContext, onMount, tick } from 'svelte';
	import { createContext } from './context.svelte.js';

	const contextName = 'combobox-context';

	export const context = () => getContext<ReturnType<typeof createContext>>(contextName);
</script>

<script lang="ts" generics="ValueType">
	import { useActions, classProp, type BaseProps } from '$lib/internal/index.js';
	import { setContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { visible: boolean }> {
		value: ValueType;
		label?: string;
		touched?: boolean;
		onChange?: (payload?: { value?: ValueType; label?: string }) => void;
	}

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
	}: Props = $props();

	const multiple = Array.isArray(value);
	const ctx = createContext<ValueType>(
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
		ctx.setMounted(true);
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
