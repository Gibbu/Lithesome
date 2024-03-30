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
		disabled = $bindable(false),
		onClick,
		onFocus,
		onKeydown,
		...props
	}: Props = $props();

	const ctx = context();

	onMount(() => {
		if (!ctx || !self) return;
		ctx.setTrigger(self);
	});

	const handleClick = (e: HandlerParam<MouseEvent, HTMLInputElement>) => {
		onClick?.(e);
		if (disabled) return;

		ctx.toggle();
	};
	const handleKeydown = (e: HandlerParam<KeyboardEvent, HTMLInputElement>) => {
		onKeydown?.(e);
		if (disabled) return;

		const { key } = e;

		if (!PREVENT_KEYS.includes(key)) {
			ctx.setTouched(true);
			if (!ctx.visible) ctx.open();
		}

		if (key === KEYS.arrowUp || key === KEYS.arrowDown || key === KEYS.end || key === KEYS.home) {
			e.preventDefault();
			if (!ctx.visible) ctx.open();
		}
		if (key === KEYS.home) ctx.navigateOptions('first');
		if (key === KEYS.end) ctx.navigateOptions('last');
		if (key === KEYS.arrowUp) ctx.navigateOptions('prev');
		if (key === KEYS.arrowDown) ctx.navigateOptions('next');
		if (key === KEYS.escape) ctx.close();
		if (key === KEYS.enter) {
			e.preventDefault();
			if (ctx.hoveredOption && ctx.visible) {
				(document.querySelector(`#${ctx.hoveredOption.id}`) as HTMLButtonElement).click();
				if (!ctx.multiple) ctx.close();
			} else {
				ctx.open();
			}
		}
		if (key === 'Tab') ctx.close();
	};
</script>

<input
	type="text"
	bind:this={self}
	use:useActions={use}
	id={ctx.uid('input')}
	class={classProp(klass, { visible: ctx.visible })}
	onclick={handleClick}
	onkeydown={handleKeydown}
	bind:value
	{...props}
/>
