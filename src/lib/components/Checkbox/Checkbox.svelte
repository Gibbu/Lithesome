<script lang="ts" context="module">
	export type Checked = boolean | 'mixed';
</script>

<script lang="ts">
	import {
		useActions,
		classProp,
		type BaseProps,
		type Optional,
		type Handler,
		type HandlerParam
	} from '$lib/internal/index.js';

	interface Props extends Optional<BaseProps<HTMLButtonElement, { checked: Checked }>, 'children'> {
		checked?: Checked;
		required?: boolean;
		disabled?: boolean;
		onClick?: Handler<MouseEvent, HTMLButtonElement>;
	}

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
	}: Props = $props();

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
