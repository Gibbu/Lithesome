<script lang="ts">
	import { context } from './Combobox.svelte';
	import { useActions, classProp, isBrowser, type Handler } from '$lib/internal/index.js';
	import { createUID } from '$lib/internal/index.js';
	import { onMount, tick } from 'svelte';
	import type { ComboboxElement, ComboboxOptionProps } from './types.js';

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
		onMouseenter,
		...props
	}: ComboboxOptionProps = $props();
	let optionEl: ComboboxElement;

	const ctx = context();
	const { uid } = createUID('item');
	const hovered = $derived(ctx.hoveredOption?.id === uid());
	const selected = $derived(!!ctx.selectedOptions.find((el) => el.dataset.value === value));
	const label = $derived(labelProp || (isBrowser && self) ? self?.textContent?.trim() : '');

	const handleClick: Handler<MouseEvent, ComboboxElement> = (e) => {
		onClick?.(e);
		if (!disabled) {
			ctx.setSelected();
		}
	};
	const handleFocus: Handler<FocusEvent, ComboboxElement> = (e) => {
		onFocus?.(e);
	};
	const handleMouseover: Handler<MouseEvent, ComboboxElement> = (e) => {
		onMouseenter?.(e);
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
	data-comboboxoption=""
	data-value={value}
	data-label={label}
	onmouseover={handleMouseover}
	onfocus={handleFocus}
	onclick={handleClick}
	{...props}
>
	{@render children({ hovered, selected })}
</button>
