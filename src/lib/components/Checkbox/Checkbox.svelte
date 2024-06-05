<script lang="ts">
	import { useActions, classProp } from '$internal';
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

	const handleClick: typeof onClick = (e) => {
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
	disabled={disabled || undefined}
	data-state={checked ? 'checked' : 'unchecked'}
	data-checkbox=""
	onclick={handleClick}
	{...props}
>
	{@render children?.({ checked })}
</button>
