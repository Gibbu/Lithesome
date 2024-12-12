import { buildContext, createUID, log, type StateValues } from '$internal';
import type { TreeButtonEvents } from './types.js';

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

	selected = $state<string | undefined>();

	constructor(props: TreeRootProps) {
		this.$value = props.value;
		this.$forceVisible = props.forceVisible;
	}

	setSelected = (itemId: string) => {
		this.selected = itemId;
	};
	getItems = (): HTMLElement[] => {
		const root = document.querySelector(`ul#${this.uid()}`);
		if (!root) return [];

		return Array.from(root.querySelectorAll('[role="treeitem"]'));
	};

	attrs = $derived.by(() => ({
		id: this.uid(),
		role: 'tree',
		'data-tree': ''
	}));
	state = $derived.by(() => ({
		selected: this.selected
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

	group = $state<boolean | null>(null);

	$id: TreeItemProps['id'];
	$disabled: TreeItemProps['disabled'];

	constructor(root: TreeRoot, props: TreeItemProps) {
		this.root = root;

		this.$id = props.id;
		this.$disabled = props.disabled;
	}

	registerGroup = () => {
		this.group = false;
	};

	attrs = $derived.by(() => ({
		id: this.uid(),
		'data-treeitem': ''
	}));
	state = $derived.by(() => ({
		selected: this.root.selected === this.$id.val
	}));
}

//
// Button
//
class TreeButton {
	item: TreeItem;
	root: TreeRoot;
	#events: TreeButtonEvents;

	HasGroup = $derived.by(() => this.item.group !== null);

	constructor(item: TreeItem, root: TreeRoot, events: TreeButtonEvents) {
		this.root = root;
		this.item = item;
		this.#events = events;
	}

	#handleClick: TreeButtonEvents['onClick'] = (e) => {
		if (this.item.$disabled.val) return;
		e.stopPropagation();
		this.#events.onClick?.(e);

		this.root.setSelected(this.item.$id.val);

		if (this.item.group !== null) {
			this.item.group = !this.item.group;
		}
	};
	#handleKeydown: TreeButtonEvents['onKeydown'] = (e) => {
		if (this.item.$disabled.val) return;
		this.#events.onKeydown?.(e);
	};

	attrs = $derived.by(
		() =>
			({
				id: this.item.uid('button'),
				role: 'treeitem',
				tabindex: this.root.selected === this.item.$id.val ? 0 : -1,
				'aria-selected': this.root.selected === this.item.$id.val,
				'aria-expanded': this.HasGroup ? (this.item.group ? 'true' : 'false') : undefined,
				type: 'button',
				'data-treebutton': '',
				'data-id': this.item.$id.val,
				onclick: this.#handleClick,
				onkeydown: this.#handleKeydown
			}) as const
	);

	state = $derived.by(() => ({
		selected: this.root.selected === this.item.$id.val
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

	Visible = $derived.by(() => this.item.group === true || this.root.$forceVisible.val);

	constructor(item: TreeItem, root: TreeRoot, props: TreeGroupProps) {
		this.root = root;
		this.item = item;

		this.$active = props.active;

		this.item.registerGroup();
	}

	attrs = $derived.by(() => ({
		role: 'group',
		'data-treegroup': '',
		'data-item': this.item.$id.val
	}));
	state = $derived.by(() => ({
		visible: this.Visible
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
