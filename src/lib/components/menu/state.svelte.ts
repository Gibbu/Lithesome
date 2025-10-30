import { tick } from 'svelte';
import { outside } from '$lib/attachments/outside.js';
import { portal } from '$lib/attachments/portal.js';
import {
	addEvents,
	buildContext,
	calculateIndex,
	createAttachment,
	createAttributes,
	floating,
	Floating,
	KEYS,
	PREVENT_KEYS
} from '$lib/internals/index.js';

import type { CalcIndexAction, GetInternalProps } from '$lib/internals/index.js';
import type {
	MenuArrowProps,
	MenuContentProps,
	MenuItemProps,
	MenuProps,
	MenuSubContentProps,
	MenuSubProps,
	MenuSubTriggerProps,
	MenuTriggerProps
} from '$lib/types/index.js';

const { attrs, selectors } = createAttributes('menu', [
	'trigger',
	'arrow',
	'content',
	'item',
	'sub-trigger',
	'sub-content'
]);

interface Group {
	path: string[];
	children: GroupItem[];
}
interface GroupItem {
	id: string;
	sub?: string;
}

class MenuBaseState extends Floating {
	$visible: RootProps['visible'];
	$disabled: RootProps['disabled'];
	$portalTarget: RootProps['portalTarget'];
	$floatingConfig: RootProps['floatingConfig'];
	id: string;

	constructor(props: RootProps) {
		super();

		this.$visible = props.visible;
		this.$disabled = props.disabled;
		this.$portalTarget = props.portalTarget;
		this.$floatingConfig = props.floatingConfig;
		this.id = props.id;
	}

	state = $derived.by(() => ({
		visible: this.$visible.val
	}));
}

//
// ~ROOT
//
type RootProps = GetInternalProps<MenuProps>;
class MenuRoot extends MenuBaseState {
	groups = $state<Record<string, Group>>({ root: { children: [], path: [] } });
	hoveredIndex = $state<number>(-1);
	focusedGroup = $state<string>('root');

	openedPath = $state<string[]>([]);
	sharedIds = new Map<'trigger' | 'content', string>();

	HoveredItem = $derived.by<GroupItem | null>(
		() => this.groups[this.focusedGroup].children?.[this.hoveredIndex] || null
	);
	CurrentGroup = $derived.by(() => this.groups[this.focusedGroup]);

	constructor(props: RootProps) {
		super(props);

		$effect(() => {
			if (!this.$visible.val) {
				this.groups = { root: { children: [], path: [] } };
				this.hoveredIndex = -1;
				this.openedPath = [];
				this.focusedGroup = 'root';
			}
		});
		$effect(() => {
			if (this.focusedGroup) {
				// Handle switching back and forth with keyboard navigation.
				this.hoveredIndex = -1;
			}
		});
	}

	open = () => {
		if (this.$disabled.val) return;
		this.$visible.val = true;
	};
	close = () => {
		if (this.$disabled.val) return;
		this.$visible.val = false;
	};
	toggle = () => {
		if (this.$disabled.val) return;
		this.$visible.val = !this.$visible.val;
	};

	navigate = (action: CalcIndexAction) => {
		if (this.$disabled.val) return;
		this.hoveredIndex = calculateIndex(action, this.CurrentGroup.children, this.hoveredIndex, true);
	};
	registerItem = (id: string, group: string, sub?: string) => {
		const find = this.groups[group].children.some((el) => el.id === id);
		if (!find) {
			if (sub) this.groups[group].children.push({ id, sub });
			else this.groups[group].children.push({ id });
		}
	};
	setHoveredItem = (item: string) => {
		this.hoveredIndex = this.CurrentGroup.children.findIndex((el) => el.id === item);
	};
	getHoveredElement = (): HTMLButtonElement | null => {
		if (!this.HoveredItem) return null;
		return document.querySelector(`${selectors.item}#${this.HoveredItem.id}`);
	};

	state = $derived.by(() => ({
		visible: this.$visible.val
	}));
}

//
// ~TRIGGER
//
type TriggerProps = GetInternalProps<MenuTriggerProps>;
class MenuTrigger {
	id: string;

	_root: MenuRoot;

	constructor(parent: MenuRoot, props: TriggerProps) {
		this.id = props.id;
		this._root = parent;

		this._root.sharedIds.set('trigger', this.id);
	}

	attrs = $derived.by(() => ({
		id: this.id,
		role: 'button',
		'aria-haspopup': 'menu',
		'aria-expanded': this._root.$visible.val,
		'aria-controls': this._root.$visible.val ? this._root.sharedIds.get('content') : undefined,
		...createAttachment((node) => {
			this._root.trigger = node;

			return addEvents(node, {
				click: this._root.toggle,
				keydown: async (e) => {
					const key = e.key;

					if (PREVENT_KEYS.includes(key)) e.preventDefault();
					if (key === KEYS.home) this._root.navigate('first');
					if (key === KEYS.end) this._root.navigate('last');
					if (key === KEYS.arrowUp) this._root.navigate('prev');
					if (key === KEYS.arrowDown) this._root.navigate('next');
					if (key === KEYS.escape) this._root.close();
					if (key === KEYS.arrowRight && this._root.HoveredItem?.sub) {
						const sub = this._root.HoveredItem.sub;
						if (sub) {
							const group = this._root.groups[sub];
							const index = group.path.indexOf(sub);

							this._root.openedPath[index] = sub;
							this._root.focusedGroup = sub;

							await tick();

							this._root.hoveredIndex = 0;
						}
					}
					if (key === KEYS.arrowLeft) {
						const path = this._root.CurrentGroup.path;
						const index = path.indexOf(this._root.focusedGroup);
						const prevGroup = path[index - 1] || 'root';

						if (path[index]) {
							this._root.openedPath.splice(index, 1);
							this._root.focusedGroup = prevGroup;
							await tick();
							this._root.hoveredIndex = this._root.groups[prevGroup].children.findIndex((el) => el.sub == path[index]);
						}
					}

					if (key === KEYS.enter) {
						e.preventDefault();
						if (this._root.$visible.val) {
							if (this._root.HoveredItem) this._root.getHoveredElement()?.click();
							else this._root.close();
						} else {
							this._root.open();
						}
					}
					if (key === KEYS.tab) this._root.close();
				}
			});
		})
	}));
}

//
// ~ARROW
//
type ArrowProps = GetInternalProps<MenuArrowProps>;
class MenuArrow {
	id: string;

	_parent: MenuRoot;

	constructor(parent: MenuRoot, props: ArrowProps) {
		this._parent = parent;
		this.id = props.id;
	}

	attrs = $derived.by(() => ({
		id: this.id,
		[attrs.arrow]: '',
		...createAttachment((node) => {
			this._parent.arrow = node;
		})
	}));

	state = $derived.by(() => ({
		visible: this._parent.$visible.val
	}));
}

//
// ~CONTENT
//
type ContentProps = GetInternalProps<MenuContentProps>;
class MenuContent {
	id: string;

	_root: MenuRoot;

	constructor(root: MenuRoot, props: ContentProps) {
		this._root = root;
		this.id = props.id;

		this._root.sharedIds.set('content', this.id);
	}

	attrs = $derived.by(() => ({
		id: this.id,
		[attrs.content]: '',
		...createAttachment((node) => {
			this._root.content = node;

			const outsideCleanUp = outside(this._root.close, [
				this._root.trigger,
				selectors.content,
				selectors['sub-content']
			])(node);
			const floatingCleanUp = floating(this._root.trigger, this._root.arrow, this._root.$floatingConfig.val)(node);
			const portalCleanUp = portal(this._root.$portalTarget.val)(node);

			return () => {
				outsideCleanUp?.();
				floatingCleanUp?.();
				portalCleanUp?.();
			};
		})
	}));

	state = $derived.by(() => ({
		visible: this._root.$visible.val
	}));
}

//
// ~ITEM
//
type ItemProps = GetInternalProps<Omit<MenuItemProps, 'href'>>;
class MenuItem {
	$disabled: ItemProps['disabled'];
	$closeOnClick: ItemProps['closeOnClick'];

	id: string;

	_root: MenuRoot;
	_sub?: MenuSub;

	IsActive = $derived.by(() => this._root.HoveredItem?.id === this.id);

	constructor(root: MenuRoot, props: ItemProps, sub?: MenuSub) {
		this._root = root;
		this._sub = sub;

		this.$disabled = props.disabled;
		this.$closeOnClick = props.closeOnClick;
		this.id = props.id;
	}

	attrs = $derived.by(() => ({
		id: this.id,
		role: 'menuitem',
		[attrs.item]: '',
		'aria-disabled': this.$disabled.val,
		'data-active': this.IsActive ? '' : undefined,
		...createAttachment((node) => {
			if (this.$disabled.val) return;

			this._root.registerItem(this.id, this._sub?.$name.val || 'root');

			return addEvents(node, {
				mouseenter: async () => {
					if (this._root.focusedGroup !== this._sub?.$name.val || 'root')
						this._root.focusedGroup = this._sub?.$name.val || 'root';

					await tick();
					this._root.setHoveredItem(this.id);

					// No idea why I had to snapshot this...?
					this._root.openedPath = $state.snapshot(this._root.groups[this._root.focusedGroup].path);
				},
				click: () => {
					if (this.$closeOnClick.val) this._root.close();
				}
			});
		})
	}));

	state = $derived.by(
		() =>
			({
				disabled: this.$disabled.val,
				active: this.IsActive
			}) as const
	);
}

//
// ~SUB
//
type SubProps = GetInternalProps<MenuSubProps>;
class MenuSub extends MenuBaseState {
	$name: SubProps['name'];

	_root: MenuRoot;
	_sub?: MenuSub;

	path = $state<string[]>([]);
	sharedIds = new Map<'content' | 'trigger', string>();

	IsActive = $derived.by(() => this._root.openedPath.includes(this.$name.val));

	constructor(root: MenuRoot, props: SubProps, sub: MenuSub) {
		super(props);

		this.$name = props.name;
		this._root = root;
		this._sub = sub;

		this.path = this._sub ? [...this._sub.path, this.$name.val] : [this.$name.val];
		this._root.groups[this.$name.val] = { path: this.path, children: [] };

		$effect(() => {
			this.$visible.val = this.IsActive;
		});
		$effect(() => {
			if (!this.$visible.val) {
				this._root.groups[this.$name.val].children = [];
			}
		});
	}
}

//
// ~SUB TRIGGER
//
type SubTriggerProps = GetInternalProps<MenuSubTriggerProps>;
class MenuSubTrigger {
	id: string;

	_root: MenuRoot;
	_sub: MenuSub;

	IsActive = $derived.by(() => this._root.HoveredItem?.id === this.id);
	IsOpened = $derived.by(() => this._root.openedPath.includes(this._sub.$name.val));

	constructor(sub: MenuSub, root: MenuRoot, props: SubTriggerProps) {
		this._root = root;
		this._sub = sub;
		this.id = props.id;

		this._sub.sharedIds.set('trigger', this.id);
	}

	attrs = $derived.by(() => ({
		id: this.id,
		role: 'menuitem',
		'aria-haspopup': 'menu',
		'aria-expanded': this.IsOpened,
		'aria-controls': this.IsOpened ? this._sub.sharedIds.get('content') : undefined,
		[attrs['sub-trigger']]: '',
		'data-active': this.IsActive ? '' : undefined,
		'data-opened': this.IsOpened ? '' : undefined,
		...createAttachment((node) => {
			if (this._sub.$disabled.val) return;

			this._sub.trigger = node;

			this._root.registerItem(
				this.id,
				this._root.groups[this._sub.$name.val]?.path?.at(-2) || 'root',
				this._sub.$name.val
			);

			return addEvents(node, {
				mouseenter: async () => {
					if (this._sub) {
						const index = this._sub.path.indexOf(this._sub.$name.val);
						this._root.openedPath[index] = this._sub.$name.val;
					}

					this._root.setHoveredItem(this.id);
				}
			});
		})
	}));

	state = $derived.by(
		() =>
			({
				disabled: this._sub.$disabled.val,
				active: this.IsActive,
				opened: this.IsOpened
			}) as const
	);
}

//
// ~SUB CONTENT
//
type SubContentProps = GetInternalProps<MenuSubContentProps>;
class MenuSubContent {
	id: string;

	_root: MenuRoot;
	_sub: MenuSub;

	constructor(sub: MenuSub, root: MenuRoot, props: ContentProps) {
		this._root = root;
		this._sub = sub;
		this.id = props.id;

		this._sub.sharedIds.set('content', this.id);
	}

	attrs = $derived.by(() => ({
		id: this.id,
		[attrs['sub-content']]: '',
		...createAttachment((node) => {
			this._sub.content = node;

			const floatingCleanUp = floating(this._sub.trigger, this._sub.arrow, this._sub.$floatingConfig.val)(node);
			const portalCleanUp = portal(this._sub.$portalTarget.val)(node);

			return () => {
				floatingCleanUp?.();
				portalCleanUp?.();
			};
		})
	}));

	state = $derived.by(() => ({
		visible: this._sub.$visible.val
	}));
}

//
// ~BUILDERS
//
const rootCtx = buildContext(MenuRoot);
const subCtx = buildContext(MenuSub);

export const createMenuRootContext = (props: RootProps) => {
	return rootCtx.create(props);
};
export const createMenuSubContext = (props: SubProps) => {
	return subCtx.create(rootCtx.get(), props, subCtx.get());
};

export const useMenuTrigger = (props: TriggerProps) => {
	return rootCtx.register(MenuTrigger, props);
};
export const useMenuContent = (props: ContentProps) => {
	return rootCtx.register(MenuContent, props);
};
export const useMenuArrow = (props: ArrowProps) => {
	return rootCtx.register(MenuArrow, props);
};
export const useMenuItem = (props: ItemProps) => {
	return rootCtx.register(MenuItem, props, subCtx.get());
};

export const useMenuSubTrigger = (props: SubTriggerProps) => {
	return subCtx.register(MenuSubTrigger, rootCtx.get(), props);
};
export const useMenuSubContent = (props: SubContentProps) => {
	return subCtx.register(MenuSubContent, rootCtx.get(), props);
};
