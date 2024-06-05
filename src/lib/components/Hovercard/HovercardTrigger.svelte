<script lang="ts">
	import { context } from './Hovercard.svelte';
	import { log, setNodeProps, addEventListeners, useActions, removeNodeProps, classProp } from '$internal';
	import { onMount } from 'svelte';
	import type { HovercardTriggerProps } from './types.js';

	let { children, class: klass, use = [], self = $bindable(), ...props }: HovercardTriggerProps = $props();

	const ctx = context();

	onMount(() => {
		if (!self) return;
		if (self && self.children.length > 1) {
			log.error('<HoverCardTrigger /> comoponent can only take 1 child node.');
			return;
		}

		const target = self.children[0] as HTMLElement;

		setNodeProps(target, {
			id: ctx.uid('trigger'),
			role: 'button',
			'aria-haspopup': 'dialog',
			'aria-expanded': 'false'
		});
		addEventListeners(target, {
			mouseenter: () => ctx.open(),
			mouseleave: () => ctx.close()
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
		} else {
			setNodeProps(target, { 'aria-expanded': 'false' });
			removeNodeProps(target, 'aria-controls');
		}
	});
</script>

<div
	bind:this={self}
	use:useActions={use}
	class={classProp(klass, { visible: ctx.visible })}
	data-hovercardtrigger=""
	{...props}
>
	{@render children({ visible: ctx.visible })}
</div>
