<script lang="ts">
	import { context } from './Menu.svelte';
	import {
		log,
		setNodeProps,
		removeNodeProps,
		addEventListeners,
		useActions,
		KEYS,
		type BaseProps
	} from '$lib/internal/index.js';
	import { onMount } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { visible: boolean }> {}

	let { children, class: klass, use = [], self, ...props } = $props<Props>();

	const API = context();

	const handleKeys = (e: KeyboardEvent) => {
		const { key } = e;

		if (key === KEYS.arrowUp || key === KEYS.arrowDown || key === KEYS.end || key === KEYS.home) e.preventDefault();
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
		if (key === 'Tab') API.close();
	};

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

<div bind:this={self} data-menutrigger="" use:useActions={use} class={classProp} {...props}>
	{@render children({ visible: API.visible })}
</div>
