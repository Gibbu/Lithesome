<script lang="ts">
	import { context } from './Tabs.svelte';
	import {
		useActions,
		KEYS,
		PREVENT_KEYS,
		classProp,
		type BaseProps,
		type Handler,
		type HandlerParam
	} from '$lib/internal/index.js';
	import { onMount } from 'svelte';

	interface Props extends BaseProps<HTMLButtonElement, { active: boolean }> {
		value: string;
		disabled?: boolean;
		onClick?: Handler<MouseEvent, HTMLButtonElement>;
		onKeydown?: Handler<KeyboardEvent, HTMLButtonElement>;
	}

	let {
		children,
		class: klass,
		use = [],
		self = $bindable(),
		disabled = false,
		value,
		onClick,
		onKeydown,
		...props
	}: Props = $props();

	const API = context();
	const active = $derived(API.activeTab === value);

	const handleClick = (e: HandlerParam<MouseEvent, HTMLButtonElement>) => {
		onClick?.(e);
		if (disabled) return;
		API.setActive(value);
	};
	const handleKeydown = (e: HandlerParam<KeyboardEvent, HTMLButtonElement>) => {
		onKeydown?.(e);
		if (disabled) return;
		const { key } = e;

		if (PREVENT_KEYS.includes(key)) e.preventDefault();

		if (key === KEYS.home) API.navigate('first');
		if (key === KEYS.end) API.navigate('last');
		if (
			(key === KEYS.arrowUp && API.orientation === 'vertical') ||
			(key === KEYS.arrowLeft && API.orientation === 'horizontal')
		)
			API.navigate('prev');
		if (
			(key === KEYS.arrowDown && API.orientation === 'vertical') ||
			(key === KEYS.arrowRight && API.orientation === 'horizontal')
		)
			API.navigate('next');
	};

	onMount(() => {
		if (!disabled) API.register(value);
	});
</script>

<button
	bind:this={self}
	use:useActions={use}
	class={classProp(klass, { active })}
	type="button"
	role="tab"
	tabindex={active ? 0 : -1}
	data-tabsbutton=""
	data-state={active ? 'active' : 'inactive'}
	data-value={value}
	onclick={handleClick}
	onkeydown={handleKeydown}
	{...props}
>
	{@render children({ active })}
</button>
