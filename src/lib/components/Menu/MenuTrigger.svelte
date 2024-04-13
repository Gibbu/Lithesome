<script lang="ts">
	import { context } from './Menu.svelte';
	import {
		log,
		setNodeProps,
		addEventListeners,
		useActions,
		KEYS,
		classProp,
		PREVENT_KEYS,
		type BaseProps,
		type Handler,
		type HandlerParam
	} from '$lib/internal/index.js';
	import { onMount } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { visible: boolean }> {
		onClick?: Handler<MouseEvent, HTMLDivElement>;
		onKeydown?: Handler<KeyboardEvent, HTMLDivElement>;
	}

	let { children, class: klass, use = [], self = $bindable(), onClick, onKeydown, ...props }: Props = $props();

	const ctx = context();

	onMount(() => {
		if (self && self.children.length > 1) {
			log.error('<MenuTrigger /> comoponent can only take 1 child node.');
			return;
		}

		const target = self?.children[0] as HTMLElement;

		setNodeProps(target, {
			id: ctx.uid('trigger'),
			'aria-haspopup': 'true',
			'aria-expanded': 'false'
		});
		addEventListeners(target, {
			click: handleClick,
			keydown: handleKeydown
		});
		ctx.trigger = target;
	});

	$effect(() => {
		if (!ctx.trigger) return;
		const target = ctx.trigger;

		if (ctx.visible) {
			setNodeProps(target, {
				'aria-expanded': 'true',
				'aria-controls': ctx.uid('content')
			});
		}
		if (!ctx.visible) {
			setNodeProps(target, { 'aria-expanded': 'false' });
		}
	});

	const handleKeydown = (e: HandlerParam<KeyboardEvent, HTMLDivElement>) => {
		onKeydown?.(e);

		const { key } = e;

		if (PREVENT_KEYS.includes(key)) e.preventDefault();
		if (key === KEYS.home) ctx.navigate('first');
		if (key === KEYS.end) ctx.navigate('last');
		if (key === KEYS.arrowUp) ctx.navigate('prev');
		if (key === KEYS.arrowDown) ctx.navigate('next');
		if (key === KEYS.escape) ctx.close();
		if (key === KEYS.enter) {
			e.preventDefault();
			if (ctx.hoveredItem && ctx.visible) {
				(document.querySelector(`#${ctx.hoveredItem}`) as HTMLButtonElement).click();
				ctx.close();
			} else {
				ctx.open();
			}
		}
		if (key === KEYS.tab) ctx.close();
	};
	const handleClick = (e: HandlerParam<MouseEvent, HTMLDivElement>) => {
		onClick?.(e);
		ctx.toggle();
	};
</script>

<div
	bind:this={self}
	use:useActions={use}
	class={classProp(klass, { visible: ctx.visible })}
	data-menutrigger=""
	{...props}
>
	{@render children({ visible: ctx.visible })}
</div>
