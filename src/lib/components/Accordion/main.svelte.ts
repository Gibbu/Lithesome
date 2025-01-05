import { buildContext, createUID, type StateValues } from '$internal';
import type {
	AccordionButtonEvents,
	AccordionButtonState,
	AccordionContentState,
	AccordionItemState,
	AccordionState
} from './types.js';

interface Item {
	id: string;
	disabled: boolean;
}

//
// Root
//
type AccordionRootProps = StateValues<{
	single: boolean;
	value: string[];
}>;
class AccordionRoot {
	uid = createUID('accordion');

	$value: AccordionRootProps['value'];
	$single: AccordionRootProps['single'];

	items = $state<Item[]>([]);
	activeItems = $state<string[]>([]);

	constructor(props: AccordionRootProps) {
		this.$single = props.single;
		this.$value = props.value;

		if (this.$value.val.length > 0) this.activeItems = this.$value.val;

		$effect(() => {
			if (this.$value.val.length) {
				this.activeItems = this.$value.val;
			}
		});
	}

	toggleActiveItem = (itemValueOrId: string) => {
		if (this.$single.val) {
			this.activeItems = this.activeItems[0] === itemValueOrId ? [] : [itemValueOrId];
		} else {
			if (this.activeItems.includes(itemValueOrId))
				this.activeItems = this.activeItems.filter((el) => el !== itemValueOrId);
			else this.activeItems.push(itemValueOrId);
		}

		this.$value.val = this.activeItems;
	};

	attrs = $derived.by(
		() =>
			({
				id: this.uid(),
				'data-value': this.$value.val.length > 0 ? this.$value.val : undefined,
				'data-accordion': ''
			}) as const
	);

	state = $derived.by<AccordionState>(() => ({
		value: this.$value.val
	}));
}

//
// Item
//
type AccordionItemProps = StateValues<{
	disabled: boolean;
	value?: string;
}>;
class AccordionItem {
	uid = createUID('item');

	_root: AccordionRoot;

	$disabled: AccordionItemProps['disabled'];
	$value: AccordionItemProps['value'];

	Active = $derived.by(() => this._root.activeItems.includes(this.$value?.val || this.uid()) || false);

	constructor(root: AccordionRoot, props: AccordionItemProps) {
		this._root = root;
		this.$disabled = props.disabled;
		this.$value = props.value;
	}

	attrs = $derived.by(
		() =>
			({
				id: this.uid(),
				'data-accordionitem': '',
				'data-disabled': this.$disabled.val,
				'data-state': this.Active ? 'opened' : 'closed',
				'data-value': this.$value?.val || undefined
			}) as const
	);
	state = $derived.by<AccordionItemState>(() => ({
		active: this.Active,
		disabled: this.$disabled.val
	}));
}

//
// Heading
//
interface AccordionHeadingProps {
	level: 1 | 2 | 3 | 4 | 5 | 6;
}
class AccordionHeading {
	_root: AccordionRoot;

	level = $state<AccordionHeadingProps['level']>(3);

	constructor(root: AccordionRoot, props: AccordionHeadingProps) {
		this._root = root;
		this.level = props.level;
	}

	attrs = $derived.by(() => ({
		role: 'heading',
		'aria-level': this.level,
		'data-accordionheading': ''
	}));
}

//
// Button
//
class AccordionButton {
	_root: AccordionRoot;
	_item: AccordionItem;
	#events: AccordionButtonEvents;

	constructor(item: AccordionItem, root: AccordionRoot, events: AccordionButtonEvents) {
		this._root = root;
		this._item = item;
		this.#events = events;
	}

	#handleClick: AccordionButtonEvents['onClick'] = (e) => {
		if (this._item.$disabled.val) return;

		this.#events.onClick?.(e);

		this._root.toggleActiveItem(this._item.$value?.val || this._item.uid());
	};

	attrs = $derived.by(
		() =>
			({
				type: 'button',
				'aria-expanded': this._item.Active,
				'aria-disabled': this._item.$disabled.val,
				'aria-controls': this._item.Active ? this._item.uid('content') : undefined,
				tabindex: this._item.$disabled.val ? -1 : 0,
				'data-accordionbutton': '',
				'data-active': this._item.Active || undefined,
				onclick: this.#handleClick
			}) as const
	);
	state = $derived.by<AccordionButtonState>(() => ({
		active: this._item.Active,
		disabled: this._item.$disabled.val as boolean
	}));
}

//
// Content
//
class AccordionContent {
	_item: AccordionItem;
	_root: AccordionRoot;

	constructor(item: AccordionItem, root: AccordionRoot) {
		this._item = item;
		this._root = root;
	}

	attrs = $derived.by(() =>
		this._item && this._root
			? {
					id: this._item.uid('content'),
					'data-accordioncontent': '',
					'data-active': this._item.Active
				}
			: {}
	);

	state = $derived.by<AccordionContentState>(() => ({
		active: this._item.Active
	}));
}

//
// Builders
//
const rootContext = buildContext(AccordionRoot);
const itemContext = buildContext(AccordionItem);

export const createAccordionRootContext = (props: AccordionRootProps) => {
	return rootContext.createContext(props);
};
export const createAccordionItemContext = (props: AccordionItemProps) => {
	return itemContext.createContext(rootContext.getContext(), props);
};
export const useAccordionHeading = (props: AccordionHeadingProps) => {
	return rootContext.register(AccordionHeading, props);
};
export const useAccordionButton = (events: AccordionButtonEvents) => {
	return itemContext.register(AccordionButton, rootContext.getContext(), events);
};
export const useAccordionContent = () => {
	return itemContext.register(AccordionContent, rootContext.getContext());
};
