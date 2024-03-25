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

	let { children, class: klass, use = [], self, ...props }: Props = $props();

	const API = context();

	const handleKeydown = (e: KeyboardEvent) => {
		const { key } = e;

		if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'End' || key === 'Home') e.preventDefault();
		if (key === 'Home') API.navigateOptions('first');
		if (key === 'End') API.navigateOptions('last');
		if (key === 'ArrowUp') API.navigateOptions('prev');
		if (key === 'ArrowDown') API.navigateOptions('next');
		if (key === 'Escape') API.close();
		if (key === 'Enter') {
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

	onMount(() => {
		if (self && self.children.length > 1) {
			log.error('<SelectTrigger /> comoponent can only take 1 children node.');
			return;
		}

		const target = self?.children[0] as HTMLElement;

		setNodeProps(target, {
			id: API.uid('trigger'),
			'aria-haspopup': 'true',
			'aria-expanded': 'false'
		});
		addEventListeners(target, {
			click: API.toggle,
			keydown: handleKeydown
		});
		API.setTrigger(target);
	});

	$effect(() => {
		if (!API.trigger) return;
		const target = API.trigger;

		if (API.hoveredOption) setNodeProps(target, { 'aria-activedescendant': API.hoveredOption.id });
		if (API.visible) {
			setNodeProps(target, {
				'aria-expanded': 'true',
				'aria-controls': API.uid('dropdown')
			});
		}
		if (!API.visible) {
			setNodeProps(target, { 'aria-expanded': 'false' });
			removeNodeProps(target, 'aria-activedescendant', 'aria-controls');
		}
	});
</script>

<div
	bind:this={self}
	use:useActions={use}
	class={classProp(klass, { visible: API.visible })}
	data-selecttrigger=""
	{...props}
	style="display: contents;"
>
	{@render children({ visible: API.visible })}
</div>
