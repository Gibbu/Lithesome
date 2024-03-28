<script lang="ts" context="module">
	import { getContext, onMount, tick } from 'svelte';
	import { createContext } from './context.svelte.js';

	const contextName = 'combobox-context';

	export const context = () => getContext<ReturnType<typeof createContext>>(contextName);
</script>

<script lang="ts" generics="ValueType">
	import { createUID, useActions, classProp, type BaseProps, type JsonValue } from '$lib/internal/index.js';
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

	const { uid } = createUID('combobox');
	const multiple = Array.isArray(value);
	const API = createContext<ValueType>(uid, multiple, {
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
	});
	setContext(contextName, API);

	onMount(async () => {
		await tick();
		API.setInitialSelected(value);
		API.close();
		API.setMounted(true);
	});
</script>

<div
	bind:this={self}
	use:useActions={use}
	id={uid()}
	class={classProp(klass, { visible: API.visible && API.mounted })}
	data-select=""
	data-state={API.visible && API.mounted ? 'opened' : 'closed'}
	{...props}
>
	{@render children({ visible: API.visible && API.mounted })}
</div>
