<script lang="ts">
	import { context } from './Popover.svelte';
	import {
		log,
		setNodeProps,
		addEventListeners,
		useActions,
		KEYS,
		classProp,
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
			log.error('<MenuTrigger /> comoponent can only take 1 children node.');
			return;
		}

		const target = self?.children[0] as HTMLElement;

		setNodeProps(target, {
			id: ctx.uid('trigger'),
			role: 'button',
			'aria-hasdialog': 'true',
			'aria-expanded': 'false'
		});
		addEventListeners(target, {
			click: handleClick,
			keydown: handleKeydown
		});
		ctx.setTrigger(target);
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

		if (key === KEYS.escape || key === KEYS.tab) ctx.close();
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
	data-popovertrigger=""
	{...props}
>
	{@render children({ visible: ctx.visible })}
</div>
