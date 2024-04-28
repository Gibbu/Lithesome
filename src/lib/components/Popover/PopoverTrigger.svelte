<script lang="ts">
	import { context } from './Popover.svelte';
	import {
		log,
		setNodeProps,
		addEventListeners,
		useActions,
		KEYS,
		classProp,
		removeNodeProps,
		type HandlerParam
	} from '$lib/internal/index.js';
	import { onMount } from 'svelte';
	import type { PopoverTriggerProps } from './types.js';

	let { children, class: klass, use = [], self = $bindable(), ...props }: PopoverTriggerProps = $props();

	const ctx = context();

	onMount(() => {
		if (self && self.children.length > 1) {
			log.error('<MenuTrigger /> comoponent can only take 1 child node.');
			return;
		}

		const target = self?.children[0] as HTMLElement;

		setNodeProps(target, {
			id: ctx.uid('trigger'),
			role: 'button',
			'aria-haspopup': 'dialog',
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
			removeNodeProps(target, 'aria-controls');
		}
	});

	const handleKeydown = (e: HandlerParam<KeyboardEvent, HTMLDivElement>) => {
		const { key } = e;

		if (key === KEYS.escape || key === KEYS.tab) ctx.close();
	};
	const handleClick = (e: HandlerParam<MouseEvent, HTMLDivElement>) => {
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
