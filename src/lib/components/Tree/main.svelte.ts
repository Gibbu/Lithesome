import { buildContext, createUID, KEYS, removeDisabledElements, singleTick, type StateValues } from '$internal';

import type { TreeButtonEvents, TreeItemState, TreeState } from './types.js';

//
// Root
//
type TreeRootProps = StateValues<{
	value: string[];
	forceVisible: boolean;
}>;
class TreeRoot {
	uid = createUID('tree');

	$value: TreeRootProps['value'];
	$forceVisible: TreeRootProps['forceVisible'];

	hoveredIndex = $state<number>(-1);
	items = $state<HTMLElement[]>([]);
	groups = $state<{ id: string; active: boolean }[]>([]);
	selectedItem = $state<string | null>(null);

	HoveredItem = $derived.by(() => this.items[this.hoveredIndex]);
	HoveredItemId = $derived.by(() => (this.items.length && this.HoveredItem ? this.HoveredItem.dataset.id : null));
	SelectedId = $derived.by(() => this.items.find((el) => el.dataset.id === this.selectedItem)?.dataset.id);

	constructor(props: TreeRootProps) {
		this.$value = props.value;
		this.$forceVisible = props.forceVisible;

		$effect(() => {
			if (this.HoveredItem) this.HoveredItem.focus();
		});
	}

	queryItems = () => {
		const root = document.querySelector(`#${this.uid()}`);
		if (!root) return [];

		this.items = removeDisabledElements('[data-treebutton][role="treeitem"]');
	};

	attrs = $derived.by(() => ({
		id: this.uid(),
		role: 'tree',
		'data-tree': ''
	}));
	state = $derived.by<TreeState>(() => ({
		item: this.SelectedId
	}));
}

//
// Item
//
type TreeItemProps = StateValues<{
	id: string;
	disabled: boolean;
}>;
class TreeItem {
	uid = createUID('item');
	_root: TreeRoot;
	_group: TreeGroup | undefined;

	$id: TreeItemProps['id'];
	$disabled: TreeItemProps['disabled'];

	Group = $derived.by(() => this._root.groups.find((el) => el.id === this.$id.val));

	constructor(root: TreeRoot, group: TreeGroup, props: TreeItemProps) {
		this._root = root;
		this._group = group;

		this.$id = props.id;
		this.$disabled = props.disabled;
	}

	attrs = $derived.by(() => ({
		id: this.uid(),
		'data-treeitem': ''
	}));
	state = $derived.by<TreeItemState>(() => ({
		selected: this._root.SelectedId === this.$id.val,
		hovered: this._root.HoveredItemId === this.$id.val
	}));
}

//
// Button
//
class TreeButton {
	_item: TreeItem;
	_root: TreeRoot;
	_group: TreeGroup | undefined;
	#events: TreeButtonEvents;

	#treeElement = $state<HTMLElement | null>(null);

	constructor(item: TreeItem, root: TreeRoot, group: TreeGroup, events: TreeButtonEvents) {
		this._root = root;
		this._item = item;
		this._group = group;
		this.#events = events;

		if (this._group && !this._group.children.includes(this._item.$id.val))
			this._group.children.push(this._item.$id.val);
	}

	#handleClick: TreeButtonEvents['onClick'] = (e) => {
		if (this._item.$disabled.val) return;
		e.stopPropagation();
		this.#events.onClick?.(e);

		this._root.queryItems();
		this._root.selectedItem = this._item.$id.val;
		this._root.hoveredIndex = this._root.items.findIndex((el) => el.dataset.id === e.currentTarget.dataset.id);

		const group = this._root.groups.find((el) => el.id === this._item.$id.val);
		if (group) {
			group.active = !group.active;
		}
	};
	#handleKeydown: TreeButtonEvents['onKeydown'] = async (e) => {
		if (this._item.$disabled.val) return;
		this.#events.onKeydown?.(e);
		e.preventDefault();

		const { key } = e;

		if (!this.#treeElement) this.#treeElement = document.querySelector(`#${this._root.uid()}`);

		if (this.#treeElement) {
			await singleTick();
			this._root.queryItems();
			this._root.hoveredIndex = this._root.items.findIndex((el) => el.dataset.id === this._root.HoveredItemId);

			if (key === KEYS.arrowUp && this._root.hoveredIndex !== 0) {
				this._root.hoveredIndex--;
			} else if (key === KEYS.arrowDown && this._root.hoveredIndex !== this._root.items.length - 1) {
				this._root.hoveredIndex++;
			} else if (key === KEYS.enter && this._root.HoveredItemId) {
				this._root.selectedItem = this._root.HoveredItemId;
			} else if (key === KEYS.arrowLeft) {
				console.log(this._group?._item.$id.val);
				if (this._item.Group && this._item.Group.id === this._item.$id.val && this._item.Group.active) {
					this._root.HoveredItem.click();
				} else {
					const currentIndex = this._root.items.indexOf(this._root.HoveredItem);
					const parentGroup = this._root.items.findLast(
						(el, i) =>
							i < currentIndex &&
							el.getAttribute('aria-expanded') === 'true' &&
							el.dataset.id === this._group?._item.$id.val
					);
					if (parentGroup) this._root.hoveredIndex = this._root.items.indexOf(parentGroup);
				}
			} else if (key === KEYS.arrowRight) {
				if (this._item.Group && !this._item.Group.active) this._root.HoveredItem.click();
				await singleTick();
				this._root.queryItems();
				if (this._item.Group?.active) {
					this._root.hoveredIndex = this._root.items.indexOf(this._root.HoveredItem) + 1;
				}
			}
		}
	};

	attrs = $derived.by(
		() =>
			({
				id: this._item.uid('button'),
				role: 'treeitem',
				tabindex: this._root.SelectedId === this._item.$id.val ? 0 : -1,
				'aria-selected': this._root.SelectedId === this._item.$id.val,
				'aria-expanded': this._item.Group ? (this._item.Group.active ? 'true' : 'false') : undefined,
				type: 'button',
				'data-treebutton': '',
				'data-id': this._item.$id.val,
				onclick: this.#handleClick,
				onkeydown: this.#handleKeydown
			}) as const
	);

	state = $derived.by<TreeItemState>(() => ({
		selected: this._root.SelectedId === this._item.$id.val,
		hovered: this._root.HoveredItemId === this._item.$id.val
	}));
}

//
// Group
//
type TreeGroupProps = StateValues<{
	active: boolean;
}>;
class TreeGroup {
	_root: TreeRoot;
	_item: TreeItem;

	children = $state<string[]>([]);

	$active: TreeGroupProps['active'];

	Visible = $derived.by(() => this.$active.val || this._root.$forceVisible.val);

	constructor(root: TreeRoot, item: TreeItem, props: TreeGroupProps) {
		this._root = root;
		this._item = item;

		this.$active = props.active;

		this._root.groups.push({
			id: this._item.$id.val,
			active: false
		});

		$effect(() => {
			if (this._item.Group) this.$active.val = this._item.Group.active;
		});
	}

	attrs = $derived.by(() => ({
		role: 'group',
		'data-treegroup': '',
		'data-item': this._item.$id.val
	}));
	state = $derived.by<TreeItemState>(() => ({
		selected: this._root.SelectedId === this._item.$id.val,
		hovered: this._root.HoveredItemId === this._item.$id.val
	}));
}

//
// Builders
//
const rootCtx = buildContext(TreeRoot);
const itemCtx = buildContext(TreeItem);
const groupCtx = buildContext(TreeGroup);

export const createTreeRootContext = (props: TreeRootProps) => {
	return rootCtx.createContext(props);
};
export const createTreeItemContext = (props: TreeItemProps) => {
	return itemCtx.createContext(rootCtx.getContext(), groupCtx.getContext(), props);
};
export const useTreeButton = (events: TreeButtonEvents) => {
	return itemCtx.register(TreeButton, rootCtx.getContext(), groupCtx.getContext(), events);
};
export const createTreeGroupContext = (props: TreeGroupProps) => {
	return groupCtx.createContext(rootCtx.getContext(), itemCtx.getContext(), props);
};
