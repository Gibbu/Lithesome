<script lang="ts" context="module">
	export type Checked = boolean | 'mixed';
</script>

<script lang="ts">
	import { useActions, type BaseProps, type Optional, type Handler, type HandlerParam } from '$lib/internal/index.js';

	interface Props extends Optional<BaseProps<HTMLButtonElement, { checked: Checked }>, 'children'> {
		checked?: Checked;
		required?: boolean;
		onClick?: Handler<MouseEvent, HTMLButtonElement>;
	}

	let {
		children,
		class: klass,
		use = [],
		self,
		checked = false,
		required = false,
		onClick,
		...props
	}: Props = $props();

	const classProp = $derived(typeof klass === 'function' ? klass({ checked }) : klass);

	const handleClick = (e: HandlerParam<MouseEvent, HTMLButtonElement>) => {
		checked = checked === 'mixed' ? true : !checked;
		onClick?.(e);
	};
</script>

<button
	type="button"
	bind:this={self}
	use:useActions={use}
	role="checkbox"
	class={classProp}
	aria-checked={checked}
	aria-required={required}
	data-state={checked}
	data-checkbox=""
	onclick={handleClick}
	{...props}
>
	{#if children}
		{@render children({ checked })}
	{/if}
</button>
