<script lang="ts">
	import { context } from './RadioGroup.svelte';
	import { log, useActions, type BaseProps, createUID, type JsonValue, KEYS } from '$lib/internal/index.js';
	import { onMount } from 'svelte';

	interface Props extends BaseProps<HTMLButtonElement, { checked: boolean }> {
		value: JsonValue;
		disabled?: boolean;
		onClick?: () => void;
	}

	let { children, class: klass, use = [], self, disabled = false, value, onClick, ...props } = $props<Props>();

	const API = context();
	const { uid } = createUID('item');

	onMount(() => {
		if (!API) log.error('<RadioGroupItem /> must be a direct child of <RadioGroup />');
		if (!disabled)
			API.register({
				id: uid(),
				value,
				disabled
			});
	});

	const checked = $derived(API.selectedItem.id === uid());
	const classProp = $derived(typeof klass === 'function' ? klass({ checked }) : klass);

	const handleClick = () => {
		if (!disabled) {
			API.setSelected({
				id: uid(),
				value,
				disabled
			});
			onClick?.();
		}
	};

	const handleKeys = (e: KeyboardEvent) => {
		const { key } = e;

		if (key === KEYS.arrowUp || key === KEYS.arrowDown || key === KEYS.end || key === KEYS.home) e.preventDefault();
		if (key === KEYS.home) API.navigateItems('first');
		if (key === KEYS.end) API.navigateItems('last');
		if (key === KEYS.arrowUp) API.navigateItems('prev');
		if (key === KEYS.arrowDown) API.navigateItems('next');
	};
</script>

<button
	type="button"
	role="radio"
	bind:this={self}
	use:useActions={use}
	id={uid()}
	{disabled}
	class={classProp}
	aria-checked={checked}
	tabindex={checked ? 0 : -1}
	data-radiogroupitem=""
	data-checked={checked || undefined}
	onclick={handleClick}
	onkeydown={handleKeys}
	{...props}
>
	{@render children({ checked })}
</button>
