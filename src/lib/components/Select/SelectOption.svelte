<script lang="ts">
	import { context } from './Select.svelte';
	import { useActions, classProp, isBrowser } from '$internal';
	import { createUID } from '$internal';
	import { onMount, tick } from 'svelte';
	import type { SelectOptionProps } from './types.js';

	let {
		children,
		class: klass,
		use = [],
		value,
		label: labelProp,
		self = $bindable(),
		disabled = $bindable(false),
		onClick,
		onFocus,
		onMouseover,
		...props
	}: SelectOptionProps = $props();
	let optionEl: HTMLButtonElement | HTMLAnchorElement;

	const ctx = context();
	const { uid } = createUID('item');
	const hovered = $derived(ctx.hoveredOption?.id === uid());
	const selected = $derived(!!ctx.selectedOptions.find((el) => el.dataset.value === value));
	const label = $derived(labelProp || (isBrowser && self) ? self?.textContent?.trim() : '');

	const handleClick: typeof onClick = (e) => {
		onClick?.(e);
		if (!disabled) {
			ctx.setSelected();
		}
	};
	const handleFocus: typeof onFocus = (e) => {
		onFocus?.(e);
	};
	const handleMouseover: typeof onMouseover = (e) => {
		onMouseover?.(e);
		if (!disabled) ctx.setHovered(uid());
	};

	onMount(() => {
		ctx.queryElements();

		return async () => {
			if (!ctx.visible) return;
			await tick();
			ctx.queryElements();
		};
	});
</script>

<button
	bind:this={self}
	bind:this={optionEl}
	use:useActions={use}
	id={uid()}
	class={classProp(klass, { hovered, selected })}
	type="button"
	{disabled}
	role="option"
	tabindex="0"
	aria-selected={selected}
	data-hovered={hovered ? '' : undefined}
	data-selected={selected ? '' : undefined}
	data-selectoption=""
	data-value={value}
	data-label={label}
	onmouseover={handleMouseover}
	onfocus={handleFocus}
	onclick={handleClick}
	{...props}
>
	{@render children({ hovered, selected })}
</button>
