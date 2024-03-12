<script lang="ts">
	import { context } from './Select.svelte';
	import { useActions, type BaseProps, type JsonValue } from '$lib/internal/index.js';
	import { createUID } from '$lib/internal/index.js';
	import { onDestroy, onMount } from 'svelte';

	interface Props extends BaseProps<HTMLAnchorElement | HTMLButtonElement, { hovered: boolean; selected: boolean }> {
		value: JsonValue;
		disabled?: boolean;
		label?: string;
		onClick?: () => void;
	}

	let { children, class: klass, use = [], value, label, disabled, onClick, ...props } = $props<Props>();
	let optionEl: HTMLButtonElement | HTMLAnchorElement;

	const API = context();
	const { uid } = createUID('item');

	onMount(() => {
		if (!API.options.some((el) => el.id === uid()) && !disabled)
			API.register({
				id: uid(),
				label: label || optionEl.textContent?.trim()!,
				value,
				disabled
			});

		return () => {
			API.unregister({ id: uid(), label: label || optionEl.textContent?.trim()!, value, disabled });
		};
	});

	const handleClick = () => {
		if (!disabled) {
			API.setSelectedOptions();
		}
	};

	const hovered = $derived(API.hoveredOption?.id === uid());
	const selected = $derived(!!API.selectedOptions.find((el) => el.value === value));
	const classProp = $derived(typeof klass === 'function' ? klass({ hovered, selected }) : klass);
</script>

<button
	type="button"
	bind:this={optionEl}
	use:useActions={use}
	id={uid()}
	class={classProp}
	data-hovered={hovered ? '' : undefined}
	data-selected={selected ? '' : undefined}
	data-selectoption=""
	aria-selected={selected || undefined}
	role="option"
	tabindex="0"
	{disabled}
	onmouseover={() => API.setHoveredOption(uid())}
	onfocus={() => {}}
	onclick={handleClick}
	{...props}
>
	{@render children({ hovered, selected })}
</button>
