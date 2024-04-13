<script lang="ts">
	import { context } from './Select.svelte';
	import {
		log,
		setNodeProps,
		removeNodeProps,
		addEventListeners,
		useActions,
		classProp,
		type BaseProps
	} from '$lib/internal/index.js';
	import { onMount } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { visible: boolean }> {}

	let { children, class: klass, use = [], self = $bindable(), ...props }: Props = $props();

	const ctx = context();

	const handleKeydown = (e: KeyboardEvent) => {
		const { key } = e;

		if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'End' || key === 'Home') e.preventDefault();
		if (key === 'Home') ctx.navigate('first');
		if (key === 'End') ctx.navigate('last');
		if (key === 'ArrowUp') ctx.navigate('prev');
		if (key === 'ArrowDown') ctx.navigate('next');
		if (key === 'Escape') ctx.close();
		if (key === 'Enter') {
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

	onMount(() => {
		if (self && self.children.length > 1) {
			log.error('<SelectTrigger /> comoponent can only take 1 child node.');
			return;
		}

		const target = self?.children[0] as HTMLElement;

		setNodeProps(target, {
			id: ctx.uid('trigger'),
			'aria-haspopup': 'true',
			'aria-expanded': 'false'
		});
		addEventListeners(target, {
			click: () => ctx.toggle(),
			keydown: handleKeydown
		});
		ctx.trigger = target;
	});

	$effect(() => {
		if (!ctx.trigger) return;
		const target = ctx.trigger;

		if (ctx.hoveredOption) setNodeProps(target, { 'aria-activedescendant': ctx.hoveredOption.id });
		if (ctx.visible) {
			setNodeProps(target, {
				'aria-expanded': 'true',
				'aria-controls': ctx.uid('content')
			});
		}
		if (!ctx.visible) {
			setNodeProps(target, { 'aria-expanded': 'false' });
			removeNodeProps(target, 'aria-activedescendant', 'aria-controls');
		}
	});
</script>

<div
	bind:this={self}
	use:useActions={use}
	class={classProp(klass, { visible: ctx.visible })}
	data-selecttrigger=""
	{...props}
	style="display: contents;"
>
	{@render children({ visible: ctx.visible })}
</div>
