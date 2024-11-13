import {
	addEventListeners,
	buildContext,
	calculateIndex,
	createUID,
	disableScroll,
	Floating,
	KEYS,
	log,
	PREVENT_KEYS,
	removeNodeProps,
	setNodeProps,
	type CalcIndexAction,
	type Handler,
	type StateValues
} from '$internal';
import { onMount } from 'svelte';
import type { MenuContentState, MenuItemEvents, MenuItemState, MenuState, MenuTriggerState } from './types.js';

//
// Root
//
type MenuRootProps = StateValues<{
	visible: boolean;
}>;
class MenuRoot extends Floating {
	uid = createUID('menu');

	$visible: MenuRootProps['visible'];

	hoveredIndex = $state<number>(-1);
	items = $state<string[]>([]);

	HoveredItem = $derived(this.items[this.hoveredIndex]);

	constructor(props: MenuRootProps) {
		super();
		this.$visible = props.visible;

		$effect(() => {
			disableScroll(this.$visible.val && !document.body.style.overflow);
		});
		$effect(() => {
			if (!this.$visible.val) this.hoveredIndex = -1;
		});
	}

	open = () => {
		this.$visible.val = true;
	};
	close = () => {
		this.$visible.val = false;
	};
	toggle = () => {
		this.$visible.val = !this.$visible.val;
	};
	navigate = (action: CalcIndexAction) => {
		this.hoveredIndex = calculateIndex(action, this.items, this.hoveredIndex);
	};
	register = (itemId: string) => {
		this.items.push(itemId);
	};
	unregister = (itemId: string) => {
		this.items = this.items.filter((el) => el !== itemId);
	};
	setHovered = (itemId: string) => {
		this.hoveredIndex = this.items.findIndex((el) => el === itemId);
	};

	attrs = $derived.by(
		() =>
			({
				id: this.uid(),
				'data-menu': '',
				'data-state': this.$visible.val ? 'opened' : 'closed'
			}) as const
	);
	state = $derived.by<MenuState>(() => ({
		visible: this.$visible.val
	}));
}

//
// Trigger
//
class MenuTrigger {
	root: MenuRoot;

	constructor(root: MenuRoot) {
		this.root = root;

		$effect(() => {
			if (this.root.trigger) {
				const child = this.root.trigger.children[0] as HTMLElement;

				setNodeProps(child, {
					id: this.root.uid('trigger'),
					role: 'button',
					'aria-haspopup': 'true',
					'aria-expanded': 'false'
				});
				addEventListeners(child, {
					click: this.#handleClick,
					keydown: this.#handleKeydown
				});

				$effect(() => {
					if (!child) return;

					if (this.root.$visible.val) {
						setNodeProps(child, {
							'aria-expanded': 'true',
							'aria-controls': this.root.uid('content')
						});
					} else {
						setNodeProps(child, { 'aria-expanded': 'false' });
						removeNodeProps(child, 'aria-controls');
					}
				});
			}
		});
	}

	registerTrigger = (trigger: HTMLElement) => {
		if (trigger.children.length > 1) log.error('<MenuTrigger /> can only have 1 direct child node.');
		this.root.trigger = trigger;
	};

	#handleKeydown: Handler<KeyboardEvent, HTMLDivElement> = (e) => {
		const { key } = e;

		if (PREVENT_KEYS.includes(key)) e.preventDefault();
		if (key === KEYS.home) this.root.navigate('first');
		if (key === KEYS.end) this.root.navigate('last');
		if (key === KEYS.arrowUp) this.root.navigate('prev');
		if (key === KEYS.arrowDown) this.root.navigate('next');
		if (key === KEYS.escape) this.root.close();
		if (key === KEYS.enter) {
			e.preventDefault();
			if (this.root.HoveredItem && this.root.$visible.val) {
				(document.querySelector(`#${this.root.HoveredItem}`) as HTMLButtonElement).click();
				this.root.close();
			} else {
				this.root.open();
			}
		}
		if (key === KEYS.tab) this.root.close();
	};
	#handleClick = () => {
		this.root.toggle();
	};

	attrs = {
		'data-menutrigger': ''
	};
	state = $derived.by<MenuTriggerState>(() => ({
		visible: this.root.$visible.val
	}));
}

//
// Arrow
//
class MenuArrow {
	root: MenuRoot;

	constructor(root: MenuRoot) {
		this.root = root;
	}

	attrs = $derived.by(() => ({
		id: this.root.uid('arrow')
	}));
}

//
// Content
//
class MenuContent {
	root: MenuRoot;

	constructor(root: MenuRoot) {
		this.root = root;
	}

	state = $derived.by<MenuContentState>(() => ({
		visible: this.root.$visible.val
	}));
}

//
// Item
//
type MenuItemProps = StateValues<{
	disabled: boolean;
}>;
class MenuItem {
	uid = createUID('item');

	root: MenuRoot;
	#events: MenuItemEvents;

	$disabled: MenuItemProps['disabled'];

	Hovered = $derived.by(() => this.root.HoveredItem === this.uid());

	constructor(root: MenuRoot, props: MenuItemProps, events: MenuItemEvents) {
		this.root = root;
		this.#events = events;

		this.$disabled = props.disabled;

		onMount(() => {
			if (!this.$disabled.val) this.root.register(this.uid());

			return () => {
				this.root.unregister(this.uid());
			};
		});
	}

	#handleClick: MenuItemEvents['onClick'] = (e) => {
		if (this.$disabled.val) return;
		this.#events.onClick?.(e);

		this.root.close();
	};
	#handleMouseover: MenuItemEvents['onMouseover'] = (e) => {
		if (this.$disabled.val) return;
		this.#events.onMouseover?.(e);

		this.root.setHovered(this.uid());
	};

	attrs = $derived.by(
		() =>
			({
				id: this.uid(),
				disabled: this.$disabled.val || undefined,
				role: 'menuitem',
				tabindex: 0,
				'data-hovered': this.Hovered ? '' : undefined,
				'data-menuitem': '',
				onmouseover: this.#handleMouseover,
				onclick: this.#handleClick
			}) as const
	);
	state = $derived.by<MenuItemState>(() => ({
		hovered: this.Hovered
	}));
}

//
// Builder
//
const rootContext = buildContext(MenuRoot);

export const createRootContext = (props: MenuRootProps) => {
	return rootContext.createContext(props);
};
export const useMenuTrigger = () => {
	return rootContext.register(MenuTrigger);
};
export const useMenuArrow = () => {
	return rootContext.register(MenuArrow);
};
export const useMenuContent = () => {
	return rootContext.register(MenuContent);
};
export const useMenuItem = (props: MenuItemProps, events: MenuItemEvents) => {
	return rootContext.register(MenuItem, props, events);
};
