import { buildContext, createUID, type StateValues } from '$internal';

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
	uid = createUID('accordion').uid;

	value: AccordionRootProps['value'];
	single: AccordionRootProps['single'];

	items = $state<Item[]>([]);
	activeItems = $state<string[]>([]);

	constructor(props: AccordionRootProps) {
		this.single = props.single;
		this.value = props.value;
	}

	toggleActiveItem = (itemId: string) => {
		if (this.single) {
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
	root: AccordionRoot;

	uid = createUID('item').uid;
	disabled: AccordionItemProps['disabled'];

	Active = $derived.by(() => this.root.activeItems.includes(this.uid()) || false);

	constructor(root: AccordionRoot, props: AccordionItemProps) {
		this.root = root;
		this.disabled = props.disabled;
	}

	attrs = $derived.by(
		() =>
			({
				'data-accordionitem': '',
				'data-disabled': this.disabled.val,
				'data-state': this.Active ? 'opened' : 'closed'
			}) as const
	);
	state = $derived.by(() => ({
		active: this.Active,
		disabled: this.disabled.val
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

	constructor(item: AccordionItem, root: AccordionRoot) {
		this.root = root;
		this.item = item;
	}

	#handleClick = () => {
		if (this.item.disabled.val) return;

		this.root.toggleActiveItem(this.item.uid());
	};

	attrs = $derived.by(
		() =>
			({
				'aria-expanded': this.item.Active,
				'aria-disabled': this.item.disabled.val,
				'aria-controls': this.item.Active ? this.root.uid('content') : undefined,
				tabindex: this.item.disabled.val ? -1 : 0,
				'data-accordionbutton': '',
				'data-active': this.item.Active || undefined,
				onclick: this.#handleClick
			}) as const
	);
	state = $derived.by(() => ({
		active: this.item.Active,
		disabled: this.item.disabled.val as boolean
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
export const useAccordionButton = () => {
	return itemContext.register(AccordionButton, rootContext.getContext());
};
export const useAccordionContent = () => {
	return itemContext.register(AccordionContent, rootContext.getContext());
};
