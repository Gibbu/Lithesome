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
		const root = document.querySelector(`#${this.uid()}`);
		if (!root) return;

		this.elements = removeDisabledElements(root.querySelectorAll('[role="treeitem"][data-treebutton]'));
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
	root: TreeRoot;

	$id: TreeItemProps['id'];
	$disabled: TreeItemProps['disabled'];

	Group = $derived.by(() => this.root.groups.find((el) => el.id === this.$id.val));

	constructor(root: TreeRoot, props: TreeItemProps) {
		this.root = root;

		this.$id = props.id;
		this.$disabled = props.disabled;
	}

	attrs = $derived.by(() => ({
		id: this.uid(),
		'data-treeitem': ''
	}));
	state = $derived.by<TreeItemState>(() => ({
		selected: this.root.SelectedId === this.$id.val,
		hovered: this.root.HoveredElementId === this.$id.val,
		active: this.Group?.active || false
	}));
}

//
// Button
//
class TreeButton {
	root: TreeRoot;
	item: TreeItem;
	#events: TreeButtonEvents;

	constructor(item: TreeItem, root: TreeRoot, events: TreeButtonEvents) {
		this.item = item;
		this.root = root;
		this.#events = events;
	}

	#handleClick: TreeButtonEvents['onClick'] = (e) => {
		if (this.item.$disabled.val) return;
		this.#events.onClick?.(e);
		e.stopPropagation();

		this.root.queryElements();

		// @ts-ignore - pointerType exist on the PointerEvent object, not the MouseEvent :\
		if (e.pointerType !== '') this.root.selectedItem = this.item.$id.val;
		this.root.hoveredIndex = this.root.elements.findIndex((el) => el.dataset.id === e.currentTarget.dataset.id);

		const group = this.root.groups.find((el) => el.id === this.item.$id.val);
		if (group) group.active = !group.active;
	};

	#handleKeydown: TreeButtonEvents['onKeydown'] = async (e) => {
		if (this.item.$disabled.val) return;
		this.#events.onKeydown?.(e);

		const { key } = e;

		if (ALL_ARROW_KEYS.includes(key) || key === KEYS.enter) e.preventDefault();

		if (this.root.treeElement) {
			await singleTick();
			this.root.queryElements();
			this.root.hoveredIndex = this.root.elements.findIndex((el) => el.dataset.id === this.root.HoveredElementId);

			if (this.root.hoveredIndex === -1 && (key === KEYS.arrowLeft || key === KEYS.arrowRight)) {
				this.root.hoveredIndex = 0;
			}
			if (key === KEYS.arrowUp && this.root.hoveredIndex !== 0) {
				this.root.hoveredIndex--;
			} else if (key === KEYS.arrowDown && this.root.hoveredIndex !== this.root.elements.length - 1) {
				this.root.hoveredIndex++;
			} else if (key === KEYS.arrowLeft) {
				if (this.item.Group && this.item.Group.id === this.item.$id.val && this.item.Group.active) {
					this.root.HoveredElement?.click();
				} else {
					if (!this.root.HoveredElement) return;

					const itemId = this.root.groups.find((el) => el.children.includes(this.item.$id.val))?.id;
					if (!itemId) return;

					const currentIndex = this.root.elements.indexOf(this.root.HoveredElement);
					const parentGroup = this.root.elements.findLast(
						(el, i) => i < currentIndex && el.getAttribute('aria-expanded') === 'true' && el.dataset.id === itemId
					);
					if (!parentGroup) return;

					this.root.hoveredIndex = this.root.elements.indexOf(parentGroup);
				}
			} else if (key === KEYS.arrowRight) {
				if (!this.item.Group?.active) {
					this.root.HoveredElement?.click();
					await singleTick();
					if (this.item.Group?.active) this.root.moveFocus = false;
				}

				if (this.item.Group?.active && !this.root.moveFocus) {
					this.root.moveFocus = true;
					return;
				}

				if (this.item.Group?.active && this.root.HoveredElement) {
					this.root.hoveredIndex = this.root.elements.indexOf(this.root.HoveredElement) + 1;
				}
			} else if (key === KEYS.end) {
				this.root.hoveredIndex = this.root.elements.length - 1;
			} else if (key === KEYS.home) {
				this.root.hoveredIndex = 0;
			} else if (key === KEYS.enter && this.root.HoveredElementId) {
				this.root.selectedItem = this.root.HoveredElementId;
			}
		}
	};

	attrs = $derived.by(
		() =>
			({
				id: this.item.uid('button'),
				role: 'treeitem',
				tabindex:
					(this.root.SelectedId === this.item.$id.val && this.root.HoveredElementId === this.item.$id.val) ||
					this.root.HoveredElementId === this.item.$id.val
						? 0
						: -1,
				'aria-selected': this.root.SelectedId === this.item.$id.val,
				'aria-expanded': this.item.Group ? (this.item.Group.active ? 'true' : 'false') : undefined,
				type: 'button',
				'data-treebutton': '',
				'data-id': this.item.$id.val,
				onclick: this.#handleClick,
				onkeydown: this.#handleKeydown
			}) as const
	);
	state = $derived.by<TreeItemState>(() => ({
		selected: this.root.SelectedId === this.item.$id.val,
		hovered: this.root.HoveredElementId === this.item.$id.val,
		active: this.item.Group?.active || false
	}));
}

//
// Group
//
type TreeGroupProps = StateValues<{
	active: boolean;
}>;
class TreeGroup {
	root: TreeRoot;
	item: TreeItem;

	$active: TreeGroupProps['active'];

	Visible = $derived.by(() => this.$active.val || this.root.$forceVisible.val);

	constructor(item: TreeItem, root: TreeRoot, props: TreeGroupProps) {
		this.root = root;
		this.item = item;

		this.$active = props.active;

		$effect(() => {
			if (this.item.Group) this.$active.val = this.item.Group.active;
		});

		$effect(() => {
			if (this.item.Group?.active) {
				singleTick(() => {
					this.root.queryElements();

					const item = document.querySelector(`#${this.item.uid()}`);
					if (!item) return;

					const group = item.querySelector('[role="group"][data-treegroup]');
					if (!group || !this.item.Group) return;

					this.item.Group.children = removeDisabledElements(
						group.querySelectorAll('[role="treeitem"][data-treebutton]')
					).map((el) => el.dataset.id) as string[];
				});
			}
		});

		onMount(() => {
			if (!this.root.groups.find((el) => el.id === this.item.$id.val)) {
				this.root.groups.push({
					id: this.item.$id.val,
					active: this.root.$forceVisible.val || false,
					children: []
				});
			}
			this.root.queryElements();

			return () => {
				this.root.groups = this.root.groups.filter((el) => el.id !== this.item.$id.val);
			};
		});
	}

	attrs = $derived.by(() => ({
		role: 'group',
		'data-treegroup': '',
		'data-item': this.item.$id.val
	}));
	state = $derived.by<TreeItemState>(() => ({
		selected: this.root.SelectedId === this.item.$id.val,
		hovered: this.root.HoveredElementId === this.item.$id.val,
		active: this.$active.val
	}));
}

//
// Builders
//
const rootCtx = buildContext(TreeRoot);
const itemCtx = buildContext(TreeItem);

export const createTreeRootContext = (props: TreeRootProps) => {
	return rootCtx.createContext(props);
};

export const createTreeItemContext = (props: TreeItemProps) => {
	return itemCtx.createContext(rootCtx.getContext(), props);
};

export const useTreeButton = (events: TreeButtonEvents) => {
	return itemCtx.register(TreeButton, rootCtx.getContext(), events);
};

export const useTreeGroup = (props: TreeGroupProps) => {
	return itemCtx.register(TreeGroup, rootCtx.getContext(), props);
};
