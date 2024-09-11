import { buildContext, createUID, type Handler, type StateValues } from '$internal';
import type { AccordionButtonEvents } from './types.js';

interface Item {
	id: string;
	disabled: boolean;
}

//
// Root
//
type AccordionRootProps = StateValues<{
	single: boolean;
	value?: string;
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
	}

	toggleActiveItem = (itemId: string) => {
		if (this.$single.val) {
			this.activeItems = this.activeItems[0] === itemId ? [] : [itemId];
		} else {
			if (this.activeItems.includes(itemId)) this.activeItems = this.activeItems.filter((el) => el !== itemId);
			else this.activeItems.push(itemId);
		}
	};

	attrs = $derived.by(
		() =>
			({
				id: this.uid(),
				'data-accordion': ''
			}) as const
	);
}

//
// Item
//
type AccordionItemProps = StateValues<{
	disabled: boolean;
}>;
class AccordionItem {
	uid = createUID('item');

	root: AccordionRoot;

	$disabled: AccordionItemProps['disabled'];

	Active = $derived.by(() => this.root.activeItems.includes(this.uid()) || false);

	constructor(root: AccordionRoot, props: AccordionItemProps) {
		this.root = root;
		this.$disabled = props.disabled;
	}

	attrs = $derived.by(
		() =>
			({
				'data-accordionitem': '',
				'data-disabled': this.$disabled.val,
				'data-state': this.Active ? 'opened' : 'closed'
			}) as const
	);
	state = $derived.by(() => ({
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
	level = $state<AccordionHeadingProps['level']>(3);
	root: AccordionRoot;

	constructor(root: AccordionRoot, props: AccordionHeadingProps) {
		this.root = root;
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
	root: AccordionRoot;
	item: AccordionItem;
	#events: AccordionButtonEvents;

	constructor(item: AccordionItem, root: AccordionRoot, events: AccordionButtonEvents) {
		this.root = root;
		this.item = item;
		this.#events = events;
	}

	#handleClick: AccordionButtonEvents['onClick'] = (e) => {
		if (this.item.$disabled.val) return;

		this.#events.onClick?.(e);

		this.root.toggleActiveItem(this.item.uid());
	};

	attrs = $derived.by(
		() =>
			({
				'aria-expanded': this.item.Active,
				'aria-disabled': this.item.$disabled.val,
				'aria-controls': this.item.Active ? this.root.uid('content') : undefined,
				tabindex: this.item.$disabled.val ? -1 : 0,
				'data-accordionbutton': '',
				'data-active': this.item.Active || undefined,
				onclick: this.#handleClick
			}) as const
	);
	state = $derived.by(() => ({
		active: this.item.Active,
		disabled: this.item.$disabled.val as boolean
	}));
}

//
// Content
//
class AccordionContent {
	item: AccordionItem;
	root: AccordionRoot;

	constructor(item: AccordionItem, root: AccordionRoot) {
		this.item = item;
		this.root = root;
	}

	attrs = $derived.by(() =>
		this.item && this.root
			? {
					id: this.root.uid('content'),
					'data-accordioncontent': '',
					'data-active': this.item.Active
				}
			: {}
	);
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
