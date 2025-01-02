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
		super('Menu');
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

	state = $derived.by<MenuState>(() => ({
		visible: this.$visible.val
	}));
}

//
// Trigger
//
class MenuTrigger {
	_root: MenuRoot;

	constructor(_root: MenuRoot) {
		this._root = _root;

		$effect(() => {
			if (this._root.trigger) {
				const child = this._root.trigger.children[0] as HTMLElement;

				setNodeProps(child, {
					id: this._root.uid('trigger'),
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

					if (this._root.$visible.val) {
						setNodeProps(child, {
							'aria-expanded': 'true',
							'aria-controls': this._root.uid('content')
						});
					} else {
						setNodeProps(child, { 'aria-expanded': 'false' });
						removeNodeProps(child, 'aria-controls');
					}
				});
			}
		});
	}

	#handleKeydown: Handler<KeyboardEvent, HTMLDivElement> = (e) => {
		const { key } = e;

		if (PREVENT_KEYS.includes(key)) e.preventDefault();
		if (key === KEYS.home) this._root.navigate('first');
		if (key === KEYS.end) this._root.navigate('last');
		if (key === KEYS.arrowUp) this._root.navigate('prev');
		if (key === KEYS.arrowDown) this._root.navigate('next');
		if (key === KEYS.escape) this._root.close();
		if (key === KEYS.enter) {
			e.preventDefault();
			if (this._root.HoveredItem && this._root.$visible.val) {
				(document.querySelector(`#${this._root.HoveredItem}`) as HTMLButtonElement).click();
				this._root.close();
			} else {
				this._root.open();
			}
		}
		if (key === KEYS.tab) this._root.close();
	};
	#handleClick = () => {
		this._root.toggle();
	};

	attrs = {
		'data-menutrigger': ''
	};
	state = $derived.by<MenuTriggerState>(() => ({
		visible: this._root.$visible.val
	}));
}

//
// Arrow
//
class MenuArrow {
	_root: MenuRoot;

	constructor(_root: MenuRoot) {
		this._root = _root;
	}

	attrs = $derived.by(() => ({
		id: this._root.uid('arrow')
	}));
}

//
// Content
//
class MenuContent {
	_root: MenuRoot;

	constructor(_root: MenuRoot) {
		this._root = _root;
	}

	state = $derived.by<MenuContentState>(() => ({
		visible: this._root.$visible.val
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

	_root: MenuRoot;
	#events: MenuItemEvents;

	$disabled: MenuItemProps['disabled'];

	Hovered = $derived.by(() => this._root.HoveredItem === this.uid());

	constructor(_root: MenuRoot, props: MenuItemProps, events: MenuItemEvents) {
		this._root = _root;
		this.#events = events;

		this.$disabled = props.disabled;

		onMount(() => {
			if (!this.$disabled.val) this._root.register(this.uid());

			return () => {
				this._root.unregister(this.uid());
			};
		});
	}

	#handleClick: MenuItemEvents['onClick'] = (e) => {
		if (this.$disabled.val) return;
		this.#events.onClick?.(e);

		this._root.close();
	};
	#handleMouseover: MenuItemEvents['onMouseover'] = (e) => {
		if (this.$disabled.val) return;
		this.#events.onMouseover?.(e);

		this._root.setHovered(this.uid());
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
const _rootContext = buildContext(MenuRoot);

export const createRootContext = (props: MenuRootProps) => {
	return _rootContext.createContext(props);
};
export const useMenuTrigger = () => {
	return _rootContext.register(MenuTrigger);
};
export const useMenuArrow = () => {
	return _rootContext.register(MenuArrow);
};
export const useMenuContent = () => {
	return _rootContext.register(MenuContent);
};
export const useMenuItem = (props: MenuItemProps, events: MenuItemEvents) => {
	return _rootContext.register(MenuItem, props, events);
};
