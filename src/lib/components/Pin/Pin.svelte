<script lang="ts" context="module">
	import { setupContext } from '$lib/internal/index.js';
	import { PinContext } from './context.svelte.js';

	export const { context, contextName } = setupContext<PinContext>();
</script>

<script lang="ts">
	import { useActions, classProp } from '$lib/internal/index.js';
	import { setContext } from 'svelte';
	import type { PinProps } from './types.js';

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
	}: PinProps = $props();

	const ctx = new PinContext(
		{ value, disabled, type, placeholder },
		{
			onChange(val) {
				onChange?.(val);
			}
		}
	);

	setContext(contextName, ctx);

	$effect(() => {
		ctx.type = type;
		ctx.disabled = disabled;
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
