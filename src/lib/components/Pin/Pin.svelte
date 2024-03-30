<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import { createContext } from './context.svelte.js';

	const contextName = 'pin-context';

	export const context = () => getContext<ReturnType<typeof createContext>>(contextName);
</script>

<script lang="ts">
	import { useActions, classProp, type BaseProps } from '$lib/internal/index.js';
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
		self = $bindable(),
		value = $bindable([]),
		disabled = $bindable(false),
		type = $bindable('text'),
		placeholder = '○',
		onChange,
		onFilled,
		...props
	}: Props = $props();

	const ctx = createContext(
		{ value, disabled, type, placeholder },
		{
			onChange(val) {
				onChange?.(val);
			}
		}
	);

	setContext(contextName, ctx);

	$effect(() => {
		ctx.setType(type);
		ctx.setDisabled(disabled);
	});

	$effect(() => {
		if (ctx.filled) onFilled?.(ctx.transformedValue);
	});
</script>

<div
	bind:this={self}
	use:useActions={use}
	id={ctx.uid()}
	class={classProp(klass, { filled: ctx.filled })}
	aria-disabled={disabled || undefined}
	data-disabled={disabled || undefined}
	data-pin=""
	data-filled={ctx.filled || undefined}
	{...props}
>
	{@render children({ filled: ctx.filled })}
</div>
