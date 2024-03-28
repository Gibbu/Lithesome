<script lang="ts">
	import { context } from './Combobox.svelte';
	import {
		useActions,
		classProp,
		PREVENT_KEYS,
		KEYS,
		type BasePropsNoChildren,
		type Handler,
		type HandlerParam
	} from '$lib/internal/index.js';
	import { onMount } from 'svelte';

	interface Props extends BasePropsNoChildren<HTMLInputElement, { visible: boolean }> {
		value: string;
		disabled?: boolean;
		onClick?: Handler<MouseEvent, HTMLInputElement>;
		onFocus?: Handler<FocusEvent, HTMLInputElement>;
		onKeydown?: Handler<KeyboardEvent, HTMLInputElement>;
	}

	let {
		class: klass,
		use = [],
		value = $bindable(),
		self = $bindable(),
		disabled,
		onClick,
		onFocus,
		onKeydown,
		...props
	}: Props = $props();

	const API = context();

	onMount(() => {
		if (!API || !self) return;
		API.setTrigger(self);
	});

	const handleClick = (e: HandlerParam<MouseEvent, HTMLInputElement>) => {
		onClick?.(e);
		if (disabled) return;

		API.toggle();
	};
	const handleKeydown = (e: HandlerParam<KeyboardEvent, HTMLInputElement>) => {
		onKeydown?.(e);
		if (disabled) return;

		const { key } = e;

		if (!PREVENT_KEYS.includes(key)) {
			API.setTouched(true);
			if (!API.visible) API.open();
		}

		if (key === KEYS.arrowUp || key === KEYS.arrowDown || key === KEYS.end || key === KEYS.home) {
			e.preventDefault();
			if (!API.visible) API.open();
		}
		if (key === KEYS.home) API.navigateOptions('first');
		if (key === KEYS.end) API.navigateOptions('last');
		if (key === KEYS.arrowUp) API.navigateOptions('prev');
		if (key === KEYS.arrowDown) API.navigateOptions('next');
		if (key === KEYS.escape) API.close();
		if (key === KEYS.enter) {
			e.preventDefault();
			if (API.hoveredOption && API.visible) {
				(document.querySelector(`#${API.hoveredOption.id}`) as HTMLButtonElement).click();
				if (!API.multiple) API.close();
			} else {
				API.open();
			}
		}
		if (key === 'Tab') API.close();
	};
</script>

<input
	type="text"
	bind:this={self}
	use:useActions={use}
	id={API.uid('input')}
	class={classProp(klass, { visible: API.visible })}
	onclick={handleClick}
	onkeydown={handleKeydown}
	bind:value
	{...props}
/>
