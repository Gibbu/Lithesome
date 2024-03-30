<script lang="ts">
	import { context } from './RadioGroup.svelte';
	import {
		log,
		useActions,
		createUID,
		KEYS,
		classProp,
		type BaseProps,
		type JsonValue,
		type Handler,
		type HandlerParam
	} from '$lib/internal/index.js';
	import { onMount } from 'svelte';

	interface Props extends BaseProps<HTMLButtonElement, { checked: boolean }> {
		value: JsonValue;
		disabled?: boolean;
		onClick?: Handler<MouseEvent, HTMLButtonElement>;
		onKeydown?: Handler<KeyboardEvent, HTMLButtonElement>;
	}

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		disabled = $bindable(false),
		value,
		onClick,
		onKeydown,
		...props
	}: Props = $props();

	const ctx = context();
	const { uid } = createUID('radio');

	onMount(() => {
		if (!ctx) log.error('<RadioGroupItem /> must be a direct child of <RadioGroup />');
		if (!disabled)
			ctx.register({
				id: uid(),
				value,
				disabled
			});
	});

	const checked = $derived(ctx.selectedItem.id === uid());

	const handleClick = (e: HandlerParam<MouseEvent, HTMLButtonElement>) => {
		onClick?.(e);
		if (!disabled) {
			ctx.setSelected({
				id: uid(),
				value,
				disabled
			});
		}
	};

	const handleKeydown = (e: HandlerParam<KeyboardEvent, HTMLButtonElement>) => {
		onKeydown?.(e);
		const { key } = e;

		if (key === KEYS.arrowUp || key === KEYS.arrowDown || key === KEYS.end || key === KEYS.home) e.preventDefault();
		if (key === KEYS.home) ctx.navigateItems('first');
		if (key === KEYS.end) ctx.navigateItems('last');
		if (key === KEYS.arrowUp) ctx.navigateItems('prev');
		if (key === KEYS.arrowDown) ctx.navigateItems('next');
	};
</script>

<button
	bind:this={self}
	use:useActions={use}
	class={classProp(klass, { checked })}
	type="button"
	role="radio"
	{disabled}
	aria-checked={checked}
	tabindex={checked ? 0 : -1}
	data-radiogroupitem=""
	data-value={value}
	data-checked={checked || undefined}
	onclick={handleClick}
	onkeydown={handleKeydown}
	{...props}
>
	{@render children({ checked })}
</button>
