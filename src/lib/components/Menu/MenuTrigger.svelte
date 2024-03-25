<script lang="ts">
	import { context } from './Menu.svelte';
	import {
		log,
		setNodeProps,
		addEventListeners,
		useActions,
		KEYS,
		classProp,
		type BaseProps,
		type Handler,
		type HandlerParam,
		PREVENT_KEYS
	} from '$lib/internal/index.js';
	import { onMount } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { visible: boolean }> {
		onClick?: Handler<MouseEvent, HTMLDivElement>;
		onKeydown?: Handler<KeyboardEvent, HTMLDivElement>;
	}

	let { children, class: klass, use = [], self, onClick, onKeydown, ...props }: Props = $props();

	const API = context();

	onMount(() => {
		if (self && self.children.length > 1) {
			log.error('<MenuTrigger /> comoponent can only take 1 children node.');
			return;
		}

		const target = self?.children[0] as HTMLElement;

		setNodeProps(target, {
			id: API.uid('trigger'),
			'aria-haspopup': 'true',
			'aria-expanded': 'false'
		});
		addEventListeners(target, {
			click: handleClick,
			keydown: handleKeydown
		});
		API.setTrigger(target);
	});

	$effect(() => {
		if (!API.trigger) return;
		const target = API.trigger;

		if (API.visible) {
			setNodeProps(target, {
				'aria-expanded': 'true',
				'aria-controls': API.uid('dropdown')
			});
		}
		if (!API.visible) {
			setNodeProps(target, { 'aria-expanded': 'false' });
		}
	});

	const handleKeydown = (e: HandlerParam<KeyboardEvent, HTMLDivElement>) => {
		onKeydown?.(e);

		const { key } = e;

		if (PREVENT_KEYS.includes(key)) e.preventDefault();
		if (key === KEYS.home) API.navigateItems('first');
		if (key === KEYS.end) API.navigateItems('last');
		if (key === KEYS.arrowUp) API.navigateItems('prev');
		if (key === KEYS.arrowDown) API.navigateItems('next');
		if (key === KEYS.escape) API.close();
		if (key === KEYS.enter) {
			e.preventDefault();
			if (API.hoveredItem && API.visible) {
				(document.querySelector(`#${API.hoveredItem}`) as HTMLButtonElement).click();
				API.close();
			} else {
				API.open();
			}
		}
		if (key === KEYS.tab) API.close();
	};
	const handleClick = (e: HandlerParam<MouseEvent, HTMLDivElement>) => {
		onClick?.(e);
		API.toggle();
	};
</script>

<div
	bind:this={self}
	use:useActions={use}
	class={classProp(klass, { visible: API.visible })}
	data-menutrigger=""
	{...props}
>
	{@render children({ visible: API.visible })}
</div>
