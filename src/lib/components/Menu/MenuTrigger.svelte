<script lang="ts">
	import { context } from './Menu.svelte';
	import {
		log,
		setNodeProps,
		removeNodeProps,
		addEventListeners,
		useActions,
		type BaseProps
	} from '$lib/internal/index.js';
	import { onMount } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { visible: boolean }> {}

	let { children, class: klass, use = [], ...props } = $props<Props>();

	const API = context();
	let btn: HTMLElement;

	const handleKeys = (e: KeyboardEvent) => {
		const { key } = e;

		if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'End' || key === 'Home') e.preventDefault();
		if (key === 'Home') API.navigateItems('first');
		if (key === 'End') API.navigateItems('last');
		if (key === 'ArrowUp') API.navigateItems('prev');
		if (key === 'ArrowDown') API.navigateItems('next');
		if (key === 'Escape') API.close();
		if (key === 'Enter') {
			e.preventDefault();
			if (API.hoveredItem && API.visible) {
				(document.querySelector(`#${API.hoveredItem}`) as HTMLButtonElement).click();
				API.close();
			} else {
				API.open();
			}
		}
	};

	onMount(() => {
		if (btn.children.length > 1) {
			log.error('<MenuTrigger /> comoponent can only take 1 children node.');
			return;
		}

		const target = btn?.children[0] as HTMLElement;

		setNodeProps(target, {
			id: API.uid('trigger'),
			'aria-haspopup': 'true',
			'aria-expanded': 'false'
		});
		addEventListeners(target, {
			click: API.toggle,
			keydown: handleKeys
		});
		API.setTrigger(target);
	});

	$effect(() => {
		if (!API.trigger) return;
		const target = API.trigger;

		if (API.hoveredItem) setNodeProps(target, { 'aria-activedescendant': API.hoveredItem });
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

	const classProp = $derived(typeof klass === 'function' ? klass({ visible: API.visible }) : klass);
</script>

<div bind:this={btn} data-menutrigger="" use:useActions={use} {...props} class={classProp}>
	{@render children({ visible: API.visible })}
</div>
