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
	$$: RootProps;

	items = $state<string[]>([]);

	constructor(props: RootProps) {
		this.$$ = props;
	}

	toggleActiveItem = (itemId: string) => {
		if (Array.isArray(this.$$.value.val)) {
			if (this.$$.value.val.includes(itemId)) this.$$.value.val = this.$$.value.val.filter((el) => el != itemId);
			else this.$$.value.val.push(itemId);
		} else {
			if (this.$$.value.val === itemId) this.$$.value.val = '';
			else this.$$.value.val = itemId;
		}
	};

	isActive = (value: string) => {
		return typeof this.$$.value.val === 'string' ? this.$$.value.val === value : this.$$.value.val.includes(value);
	};

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.root]: ''
	}));

	state = $derived.by(() => ({
		/**
		 * The current value.
		 */
		value: this.$$.value.val
	}));
}

//
// ~~ITEM
//
type ItemProps = GetInternalProps<AccordionItemProps>;
class AccordionItem {
	$$: ItemProps;

	_root: AccordionRoot;

	sharedIds = new SvelteMap<'item' | 'button' | 'content', string>();

	Active = $derived.by(() => this._root.isActive(this.$$.value.val));

	constructor(root: AccordionRoot, props: ItemProps) {
		this.$$ = props;
		this._root = root;

		this.sharedIds.set('item', this.$$.id.val);
	}

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.item]: '',
		'data-value': this.$$.value.val
	}));

	state = $derived.by(() => ({
		/**
		 * True if the item is active.
		 */
		active: this.Active,
		/**
		 * True the item is disabled.
		 */
		disabled: this.$$.disabled.val
	}));
}

//
// ~~HEADING
//
type HeadingProps = GetInternalProps<AccordionHeadingProps>;
class AccordionHeading {
	$$: HeadingProps;

	_root: AccordionRoot;
	_item: AccordionItem;

	constructor(root: AccordionRoot, item: AccordionItem, props: HeadingProps) {
		this.$$ = props;

		this._root = root;
		this._item = item;
	}

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.heading]: '',
		role: 'heading',
		'aria-level': this.$$.level.val
	}));

	state = $derived.by(() => ({
		/**
		 * True if the item is active.
		 */
		active: this._item.Active
	}));
}

//
// ~~BUTTON
//
type ButtonProps = GetInternalProps<AccordionButtonProps>;
class AccordionButton {
	$$: ButtonProps;

	_item: AccordionItem;
	_root: AccordionRoot;

	constructor(item: AccordionItem, root: AccordionRoot, props: ButtonProps) {
		this.$$ = props;

		this._item = item;
		this._root = root;

		this._item.sharedIds.set('button', this.$$.id.val);
	}

	props = $derived.by(
		() =>
			({
				id: this.$$.id.val,
				[attrs.button]: '',
				type: 'button',
				'aria-expanded': this._item.Active,
				'aria-controls': this._item.Active ? this._item.sharedIds.get('content') : undefined,
				tabindex: this._item.$$.disabled.val ? -1 : 0,
				...attach((node) =>
					addEvents(node, {
						click: () => {
							if (this._item.$$.disabled.val) return;
							this._root.toggleActiveItem(this._item.$$.value.val);
						}
					})
				)
			}) as const
	);

	state = $derived.by(() => ({
		/**
		 * True if the item is active.
		 */
		active: this._item.Active,
		/**
		 * True if the item is disabled.
		 */
		disabled: this._item.$$.disabled.val
	}));
}

//
// ~~CONTENT
//
type ContentProps = GetInternalProps<AccordionContentProps>;
class AccordionContent {
	$$: ContentProps;

	_item: AccordionItem;
	_root: AccordionRoot;

	constructor(item: AccordionItem, root: AccordionRoot, props: ContentProps) {
		this.$$ = props;

		this._item = item;
		this._root = root;

		this._item.sharedIds.set('content', this.$$.id.val);
	}

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.content]: ''
	}));

	state = $derived.by(() => ({
		/**
		 * True if the item is active.
		 */
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
