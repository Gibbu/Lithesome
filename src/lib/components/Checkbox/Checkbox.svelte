<script lang="ts">
	import { useActions, classProp, type HandlerParam } from '$lib/internal/index.js';
	import type { CheckboxProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		checked = $bindable(false),
		required = false,
		disabled = $bindable(false),
		onClick,
		...props
	}: CheckboxProps = $props();

	const handleClick = (e: HandlerParam<MouseEvent, HTMLButtonElement>) => {
		onClick?.(e);
		if (disabled) return;

		checked = checked === 'mixed' ? true : !checked;
	};
</script>

<button
	type="button"
	bind:this={self}
	use:useActions={use}
	class={classProp(klass, { checked })}
	role="checkbox"
	aria-checked={checked}
	aria-required={required}
	data-state={checked ? 'checked' : 'unchecked'}
	data-checkbox=""
	onclick={handleClick}
	{...props}
>
	{#if children}
		{@render children({ checked })}
	{/if}
</button>
