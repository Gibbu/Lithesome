<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import { createContext } from './context.svelte.js';

	const contextName = 'pin-context';

	export const context = () => getContext<ReturnType<typeof createContext>>(contextName);
</script>

<script lang="ts">
	import { createUID, useActions, type BaseProps } from '$lib/internal/index.js';
	import { setContext } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { filled: boolean }> {
		value: string[];
		disabled?: boolean;
		type?: 'text' | 'password';
		placeholder?: string;
		onChange?: (value: string) => void;
	}

	let {
		children,
		use = [],
		class: klass,
		self,
		value,
		disabled = false,
		type = 'text',
		placeholder = '○',
		onChange,
		...props
	} = $props<Props>();

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

	const classProp = $derived(typeof klass === 'function' ? klass({ filled: API.filled }) : klass);

	$effect(() => {
		API.setType(type);
		API.setDisabled(disabled);
	});
</script>

<div
	bind:this={self}
	id={uid()}
	use:useActions={use}
	class={classProp}
	data-disabled={disabled || undefined}
	aria-disabled={disabled || undefined}
	data-pin=""
	data-filled={API.filled || undefined}
	{...props}
>
	{@render children({ filled: API.filled })}
</div>