<script lang="ts">
	import { context } from './Combobox.svelte';
	import {
		useActions,
		classProp,
		type BaseProps,
		type JsonValue,
		type Handler,
		type HandlerParam,
		isBrowser
	} from '$lib/internal/index.js';
	import { createUID } from '$lib/internal/index.js';
	import { onMount, tick } from 'svelte';

	type HandlerEl = HTMLAnchorElement | HTMLButtonElement;

	interface Props extends BaseProps<HTMLAnchorElement | HTMLButtonElement, { hovered: boolean; selected: boolean }> {
		value: JsonValue;
		disabled?: boolean;
		label?: string;
		onClick?: Handler<MouseEvent, HandlerEl>;
		onFocus?: Handler<FocusEvent, HandlerEl>;
		onMouseenter?: Handler<MouseEvent, HandlerEl>;
	}

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
	}: Props = $props();
	let optionEl: HTMLButtonElement | HTMLAnchorElement;

	const ctx = context();
	const { uid } = createUID('item');
	const hovered = $derived(ctx.hoveredOption?.id === uid());
	const selected = $derived(!!ctx.selectedOptions.find((el) => el.dataset.value === value));
	const label = $derived(labelProp || (isBrowser && self) ? self?.textContent?.trim() : '');

	const handleClick = (e: HandlerParam<MouseEvent, HandlerEl>) => {
		onClick?.(e);
		if (!disabled) {
			ctx.setSelectedOptions();
		}
	};
	const handleFocus = (e: HandlerParam<FocusEvent, HandlerEl>) => {
		onFocus?.(e);
	};
	const handleMouseover = (e: HandlerParam<MouseEvent, HandlerEl>) => {
		onMouseenter?.(e);
		if (!disabled) ctx.setHoveredOption(uid());
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
