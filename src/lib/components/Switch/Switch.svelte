<script lang="ts">
	import { useActions, classProp, type Handler } from '$lib/internal/index.js';
	import type { SwitchProps } from './types.js';

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
	}: SwitchProps = $props();

	const handleClick: Handler<MouseEvent, HTMLButtonElement> = (e) => {
		onClick?.(e);
		if (disabled) return;

		checked = !checked;
	};
</script>

<button
	type="button"
	bind:this={self}
	use:useActions={use}
	class={classProp(klass, { checked, disabled })}
	role="switch"
	aria-checked={checked}
	aria-required={required}
	aria-readonly={disabled || undefined}
	disabled={disabled || undefined}
	data-state={checked ? 'checked' : 'unchecked'}
	data-switch=""
	onclick={handleClick}
	{...props}
>
	{@render children?.({ checked, disabled })}
</button>
