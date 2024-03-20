<script lang="ts">
	import { context } from './Popover.svelte';
	import {
		log,
		setNodeProps,
		addEventListeners,
		useActions,
		KEYS,
		type BaseProps,
		type Handler,
		type HandlerParam
	} from '$lib/internal/index.js';
	import { onMount } from 'svelte';

	interface Props extends BaseProps<HTMLDivElement, { visible: boolean }> {
		onClick?: Handler<MouseEvent, HTMLDivElement>;
		onKeydown?: Handler<KeyboardEvent, HTMLDivElement>;
	}

	let { children, class: klass, use = [], self, onClick, onKeydown, ...props }: Props = $props();

	const API = context();
	const classProp = $derived(typeof klass === 'function' ? klass({ visible: API.visible }) : klass);

	onMount(() => {
		if (self && self.children.length > 1) {
			log.error('<MenuTrigger /> comoponent can only take 1 children node.');
			return;
		}

		const target = self?.children[0] as HTMLElement;

		setNodeProps(target, {
			id: API.uid('trigger'),
			role: 'button',
			'aria-hasdialog': 'true',
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
				'aria-controls': API.uid('content')
			});
		}
		if (!API.visible) {
			setNodeProps(target, { 'aria-expanded': 'false' });
		}
	});

	const handleKeydown = (e: HandlerParam<KeyboardEvent, HTMLDivElement>) => {
		onKeydown?.(e);

		const { key } = e;

		if (key === KEYS.escape || key === KEYS.tab) API.close();
	};
	const handleClick = (e: HandlerParam<MouseEvent, HTMLDivElement>) => {
		onClick?.(e);
		API.toggle();
	};
</script>

<div bind:this={self} use:useActions={use} class={classProp} data-popovertrigger="" {...props}>
	{@render children({ visible: API.visible })}
</div>
