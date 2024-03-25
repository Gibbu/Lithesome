<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import { createContext } from './context.svelte.js';

	const contextName = 'pin-context';

	export const context = () => getContext<ReturnType<typeof createContext>>(contextName);
</script>

<script lang="ts">
	import { createUID, useActions, classProp, type BaseProps } from '$lib/internal/index.js';
	import { setContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { filled: boolean }> {
		value?: string[];
		disabled?: boolean;
		type?: 'text' | 'password';
		placeholder?: string;
		onChange?: (value: string) => void;
		onFilled?: (value: string) => void;
	}

	let {
		children,
		use = [],
		class: klass,
		self,
		value = [],
		disabled = false,
		type = 'text',
		placeholder = '○',
		onChange,
		onFilled,
		...props
	}: Props = $props();

	const { uid } = createUID('pin');
	const API = createContext(
		uid,
		{ value, disabled, type, placeholder },
		{
			onChange(val) {
				onChange?.(val);
			}
		}
	);

	setContext(contextName, API);

	$effect(() => {
		API.setType(type);
		API.setDisabled(disabled);
	});

	$effect(() => {
		if (API.filled) onFilled?.(API.transformedValue);
	});
</script>

<div
	bind:this={self}
	use:useActions={use}
	id={uid()}
	class={classProp(klass, { filled: API.filled })}
	aria-disabled={disabled || undefined}
	data-disabled={disabled || undefined}
	data-pin=""
	data-filled={API.filled || undefined}
	{...props}
>
	{@render children({ filled: API.filled })}
</div>
