import { SvelteMap } from 'svelte/reactivity';
import { attach } from '$lib/internals/attachment.js';
import { buildContext } from '$lib/internals/context.svelte.js';
import { addEvents, createAttributes } from '$lib/internals/utils.svelte.js';

import type { GetInternalProps } from '$lib/internals/types.js';
import type {
	AccordionButtonProps,
	AccordionContentProps,
	AccordionHeadingProps,
	AccordionItemProps,
	AccordionProps
} from '$lib/types/index.js';

const { attrs } = createAttributes('accordion', ['root', 'item', 'heading', 'button', 'content']);

//
// ~~ROOT
//
type RootProps = GetInternalProps<AccordionProps>;
export class AccordionRoot {
	$id: string;
	$value: RootProps['value'];

	items = $state<string[]>([]);

	constructor(props: RootProps) {
		this.$value = props.value;
		this.$id = props.id;
	}

	toggleActiveItem = (itemId: string) => {
		if (Array.isArray(this.$value.val)) {
			if (this.$value.val.includes(itemId)) this.$value.val = this.$value.val.filter((el) => el != itemId);
			else this.$value.val.push(itemId);
		} else {
			if (this.$value.val === itemId) this.$value.val = '';
			else this.$value.val = itemId;
		}
	};

	isActive = (value: string) => {
		return typeof this.$value.val === 'string' ? this.$value.val === value : this.$value.val.includes(value);
	};

	props = $derived.by(() => ({
		id: this.$id,
		[attrs.root]: ''
	}));

	state = $derived.by(() => ({
		value: this.$value.val
	}));
}

//
// ~~ITEM
//
type ItemProps = GetInternalProps<AccordionItemProps>;
class AccordionItem {
	$id: string;
	$value: ItemProps['value'];
	$disabled: ItemProps['disabled'];

	_root: AccordionRoot;

	sharedIds = new SvelteMap<'item' | 'button' | 'content', string>();

	Active = $derived.by(() => this._root.isActive(this.$value.val));

	constructor(root: AccordionRoot, props: ItemProps) {
		this._root = root;
		this.$value = props.value;
		this.$disabled = props.disabled;
		this.$id = props.id;

		this.sharedIds.set('item', this.$id);
	}

	props = $derived.by(() => ({
		id: this.$id,
		[attrs.item]: '',
		'data-value': this.$value.val
	}));

	state = $derived.by(() => ({
		active: this.Active,
		disabled: this.$disabled.val
	}));
}

//
// ~~HEADING
//
type HeadingProps = GetInternalProps<AccordionHeadingProps>;
class AccordionHeading {
	$id: HeadingProps['id'];
	$level: HeadingProps['level'];

	_root: AccordionRoot;
	_item: AccordionItem;

	constructor(root: AccordionRoot, item: AccordionItem, props: HeadingProps) {
		this._root = root;
		this._item = item;
		this.$level = props.level;
		this.$id = props.id;
	}

	props = $derived.by(() => ({
		id: this.$id,
		[attrs.heading]: '',
		role: 'heading',
		'aria-level': this.$level.val
	}));

	state = $derived.by(() => ({
		active: this._item.Active
	}));
}

//
// ~~BUTTON
//
type ButtonProps = GetInternalProps<AccordionButtonProps>;
class AccordionButton {
	$id: ButtonProps['id'];

	_item: AccordionItem;
	_root: AccordionRoot;

	constructor(item: AccordionItem, root: AccordionRoot, props: ButtonProps) {
		this._item = item;
		this._root = root;
		this.$id = props.id;

		this._item.sharedIds.set('button', this.$id);
	}

	props = $derived.by(
		() =>
			({
				id: this.$id,
				[attrs.button]: '',
				type: 'button',
				'aria-expanded': this._item.Active,
				'aria-controls': this._item.Active ? this._item.sharedIds.get('content') : undefined,
				tabindex: this._item.$disabled.val ? -1 : 0,
				...attach((node) =>
					addEvents(node, {
						click: () => {
							if (this._item.$disabled.val) return;
							this._root.toggleActiveItem(this._item.$value.val);
						}
					})
				)
			}) as const
	);

	state = $derived.by(() => ({
		active: this._item.Active,
		disabled: this._item.$disabled.val
	}));
}

//
// ~~CONTENT
//
type ContentProps = GetInternalProps<AccordionContentProps>;
class AccordionContent {
	$id: ContentProps['id'];

	_item: AccordionItem;
	_root: AccordionRoot;

	constructor(item: AccordionItem, root: AccordionRoot, props: ContentProps) {
		this._item = item;
		this._root = root;
		this.$id = props.id;

		this._item.sharedIds.set('content', this.$id);
	}

	props = $derived.by(() => ({
		id: this.$id,
		[attrs.content]: ''
	}));

	state = $derived.by(() => ({
		active: this._item.Active
	}));
}

//
// ~~BUILDERS
//
const rootContext = buildContext(AccordionRoot);
const itemContext = buildContext(AccordionItem);

export const createAccordionRootContext = (props: RootProps) => {
	return rootContext.create(props);
};
export const createAccordionItemContext = (props: ItemProps) => {
	return itemContext.create(rootContext.get(), props);
};
export const useAccordionHeading = (props: HeadingProps) => {
	return rootContext.register(AccordionHeading, itemContext.get(), props);
};
export const useAccordionButton = (props: ButtonProps) => {
	return itemContext.register(AccordionButton, rootContext.get(), props);
};
export const useAccordionContent = (props: ContentProps) => {
	return itemContext.register(AccordionContent, rootContext.get(), props);
};
