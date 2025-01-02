import {
	ALL_ARROW_KEYS,
	buildContext,
	createUID,
	KEYS,
	removeDisabledElements,
	singleTick,
	type StateValues
} from '$internal';
import { onMount } from 'svelte';

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
	elements = $state<HTMLElement[]>([]);
	groups = $state<{ id: string; active: boolean; children: string[] }[]>([]);
	selectedItem = $state<string | null>(null);
	treeElement = $state<HTMLElement | null>(null);
	moveFocus = $state<boolean>(false);

	HoveredElement = $derived.by<HTMLElement | undefined>(() => this.elements[this.hoveredIndex]);
	HoveredElementId = $derived.by<string | undefined>(() =>
		this.elements.length && this.HoveredElement ? this.HoveredElement.dataset.id : undefined
	);
	SelectedId = $derived.by(() =>
		this.elements.length && this.selectedItem
			? this.elements.find((el) => el.dataset.id === this.selectedItem)?.dataset.id
			: null
	);

	constructor(props: TreeRootProps) {
		this.$value = props.value;
		this.$forceVisible = props.forceVisible;

		$effect(() => {
			this.HoveredElement?.focus();
		});
		$effect(() => {
			if (this.selectedItem) this.$value.val = [this.selectedItem];
		});
		onMount(() => {
			this.treeElement = document.querySelector(`#${this.uid()}`);
			if (!this.$value.val.length && this.treeElement) {
				this.treeElement.querySelector('[role="treeitem"][data-treebutton]')?.setAttribute('tabindex', '0');
			}
		});
	}

	queryElements = () => {
		const _root = document.querySelector(`#${this.uid()}`);
		if (!_root) return;

		this.elements = removeDisabledElements(_root.querySelectorAll('[role="treeitem"][data-treebutton]'));
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

	$id: TreeItemProps['id'];
	$disabled: TreeItemProps['disabled'];

	Group = $derived.by(() => this._root.groups.find((el) => el.id === this.$id.val));

	constructor(_root: TreeRoot, props: TreeItemProps) {
		this._root = _root;

		this.$id = props.id;
		this.$disabled = props.disabled;
	}

	attrs = $derived.by(() => ({
		id: this.uid(),
		'data-treeitem': ''
	}));
	state = $derived.by<TreeItemState>(() => ({
		selected: this._root.SelectedId === this.$id.val,
		hovered: this._root.HoveredElementId === this.$id.val,
		active: this.Group?.active || false,
		disabled: this.$disabled.val
	}));
}

//
// Button
//
class TreeButton {
	_root: TreeRoot;
	_item: TreeItem;
	#events: TreeButtonEvents;

	constructor(item: TreeItem, _root: TreeRoot, events: TreeButtonEvents) {
		this._item = item;
		this._root = _root;
		this.#events = events;
	}

	#handleClick: TreeButtonEvents['onClick'] = (e) => {
		if (this._item.$disabled.val) return;
		this.#events.onClick?.(e);
		e.stopPropagation();

		this._root.queryElements();

		// @ts-ignore - pointerType exist on the PointerEvent object, not the MouseEvent :\
		if (e.pointerType !== '') this._root.selectedItem = this._item.$id.val;
		this._root.hoveredIndex = this._root.elements.findIndex((el) => el.dataset.id === e.currentTarget.dataset.id);

		const group = this._root.groups.find((el) => el.id === this._item.$id.val);
		if (group) group.active = !group.active;
	};

	#handleKeydown: TreeButtonEvents['onKeydown'] = async (e) => {
		if (this._item.$disabled.val) return;
		this.#events.onKeydown?.(e);

		const { key } = e;

		if (ALL_ARROW_KEYS.includes(key) || key === KEYS.enter) e.preventDefault();

		if (this._root.treeElement) {
			await singleTick();
			this._root.queryElements();
			this._root.hoveredIndex = this._root.elements.findIndex((el) => el.dataset.id === this._root.HoveredElementId);

			if (this._root.hoveredIndex === -1 && (key === KEYS.arrowLeft || key === KEYS.arrowRight)) {
				this._root.hoveredIndex = 0;
			}
			if (key === KEYS.arrowUp && this._root.hoveredIndex !== 0) {
				this._root.hoveredIndex--;
			} else if (key === KEYS.arrowDown && this._root.hoveredIndex !== this._root.elements.length - 1) {
				this._root.hoveredIndex++;
			} else if (key === KEYS.arrowLeft) {
				if (this._item.Group && this._item.Group.id === this._item.$id.val && this._item.Group.active) {
					this._root.HoveredElement?.click();
				} else {
					if (!this._root.HoveredElement) return;

					const itemId = this._root.groups.find((el) => el.children.includes(this._item.$id.val))?.id;
					if (!itemId) return;

					const currentIndex = this._root.elements.indexOf(this._root.HoveredElement);
					const parentGroup = this._root.elements.findLast(
						(el, i) => i < currentIndex && el.getAttribute('aria-expanded') === 'true' && el.dataset.id === itemId
					);
					if (!parentGroup) return;

					this._root.hoveredIndex = this._root.elements.indexOf(parentGroup);
				}
			} else if (key === KEYS.arrowRight) {
				if (!this._item.Group?.active) {
					this._root.HoveredElement?.click();
					await singleTick();
					if (this._item.Group?.active) this._root.moveFocus = false;
				}

				if (this._item.Group?.active && !this._root.moveFocus) {
					this._root.moveFocus = true;
					return;
				}

				if (this._item.Group?.active && this._root.HoveredElement) {
					this._root.hoveredIndex = this._root.elements.indexOf(this._root.HoveredElement) + 1;
				}
			} else if (key === KEYS.end) {
				this._root.hoveredIndex = this._root.elements.length - 1;
			} else if (key === KEYS.home) {
				this._root.hoveredIndex = 0;
			} else if (key === KEYS.enter && this._root.HoveredElementId) {
				this._root.selectedItem = this._root.HoveredElementId;
			}
		}
	};

	attrs = $derived.by(
		() =>
			({
				id: this._item.uid('button'),
				role: 'treeitem',
				tabindex:
					(this._root.SelectedId === this._item.$id.val && this._root.HoveredElementId === this._item.$id.val) ||
					this._root.HoveredElementId === this._item.$id.val
						? 0
						: -1,
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
		hovered: this._root.HoveredElementId === this._item.$id.val,
		active: this._item.Group?.active || false,
		disabled: this._item.$disabled.val
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

	$active: TreeGroupProps['active'];

	Visible = $derived.by(() => this.$active.val || this._root.$forceVisible.val);

	constructor(item: TreeItem, _root: TreeRoot, props: TreeGroupProps) {
		this._root = _root;
		this._item = item;

		this.$active = props.active;

		$effect(() => {
			if (this._item.Group) this.$active.val = this._item.Group.active;
		});

		$effect(() => {
			if (this._item.Group?.active) {
				singleTick(() => {
					this._root.queryElements();

					const item = document.querySelector(`#${this._item.uid()}`);
					if (!item) return;

					const group = item.querySelector('[role="group"][data-treegroup]');
					if (!group || !this._item.Group) return;

					this._item.Group.children = removeDisabledElements(
						group.querySelectorAll('[role="treeitem"][data-treebutton]')
					).map((el) => el.dataset.id) as string[];
				});
			}
		});

		onMount(() => {
			if (!this._root.groups.find((el) => el.id === this._item.$id.val)) {
				this._root.groups.push({
					id: this._item.$id.val,
					active: this._root.$forceVisible.val || false,
					children: []
				});
			}
			this._root.queryElements();

			return () => {
				this._root.groups = this._root.groups.filter((el) => el.id !== this._item.$id.val);
			};
		});
	}

	attrs = $derived.by(() => ({
		role: 'group',
		'data-treegroup': '',
		'data-item': this._item.$id.val
	}));
	state = $derived.by<TreeItemState>(() => ({
		selected: this._root.SelectedId === this._item.$id.val,
		hovered: this._root.HoveredElementId === this._item.$id.val,
		active: this.$active.val,
		disabled: this._item.$disabled.val
	}));
}

//
// Builders
//
const _rootCtx = buildContext(TreeRoot);
const itemCtx = buildContext(TreeItem);

export const createTreeRootContext = (props: TreeRootProps) => {
	return _rootCtx.createContext(props);
};

export const createTreeItemContext = (props: TreeItemProps) => {
	return itemCtx.createContext(_rootCtx.getContext(), props);
};

export const useTreeButton = (events: TreeButtonEvents) => {
	return itemCtx.register(TreeButton, _rootCtx.getContext(), events);
};

export const useTreeGroup = (props: TreeGroupProps) => {
	return itemCtx.register(TreeGroup, _rootCtx.getContext(), props);
};
