import { buildContext, createUID, type Handler, type RootEvents } from '$internal';
import type { AccordionHeadingProps } from './types.js';

interface Item {
	id: string;
	disabled: boolean;
}

//
// Root
//
interface AccordionRootStateProps extends RootEvents<AccordionRootStateProps> {
	single: boolean;
	value?: string;
}
class AccordionRootState {
	uid = createUID('accordion').uid;
	value = $state<string | undefined>(undefined);
	items = $state<Item[]>([]);
	activeItems = $state<string[]>([]);
	single = $state<boolean>(false);

	constructor(props: AccordionRootStateProps) {
		this.single = props.single;
		this.value = props.value;

		$effect(() => {
			props.onContextChange?.({ single: this.single, value: this.value });
		});
	}
	onComponentChange(props: AccordionRootStateProps) {
		this.single = props.single;
		this.value = props.value;
	}

	toggleActiveItem(itemId: string) {
		if (this.single) {
			this.activeItems = this.activeItems[0] === itemId ? [] : [itemId];
		} else {
			if (this.activeItems.includes(itemId)) this.activeItems = this.activeItems.filter((el) => el !== itemId);
			else this.activeItems.push(itemId);
		}
	}

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
interface AccordionItemStateProps extends RootEvents<AccordionItemStateProps> {
	disabled: boolean;
}
class AccordionItemState {
	uid = createUID('item').uid;
	disabled = $state<boolean>(false);
	root: AccordionRootState;

	Active = $derived.by(() => this.root.activeItems.includes(this.uid()) || false);

	constructor(root: AccordionRootState, props: AccordionItemStateProps) {
		this.root = root;
		this.disabled = props.disabled;

		props.onContextChange?.({ disabled: this.disabled });
	}
	onComponentChange(props: AccordionItemStateProps) {
		this.disabled = props.disabled;
	}

	attrs = $derived.by(
		() =>
			({
				'data-accordionitem': '',
				'data-disabled': this.disabled,
				'data-state': this.Active ? 'opened' : 'closed'
			}) as const
	);
	state = $derived.by(() => ({
		active: this.Active,
		disabled: this.disabled
	}));
}

//
// Heading
//
interface AccordionHeadingStateProps extends RootEvents<AccordionHeadingStateProps> {
	level: AccordionHeadingProps['level'];
}
class AccordionHeadingState {
	level = $state<AccordionHeadingProps['level']>(3);
	root: AccordionRootState;

	constructor(root: AccordionRootState, props: AccordionHeadingStateProps) {
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
class AccordionButtonState {
	root: AccordionRootState;
	item: AccordionItemState;

	constructor(item: AccordionItemState, root: AccordionRootState) {
		this.root = root;
		this.item = item;
		console.log(this.root, this.item);
	}

	#handleClick: Handler<MouseEvent, HTMLButtonElement> = (e) => {
		if (this.item.disabled) return;

		this.root.toggleActiveItem(this.item.uid());
	};

	attrs = $derived.by(
		() =>
			({
				'aria-expanded': this.item.Active,
				'aria-disabled': this.item.disabled,
				'aria-controls': this.item.Active ? this.root.uid('content') : undefined,
				tabindex: this.item.disabled ? -1 : 0,
				'data-accordionbutton': '',
				'data-active': this.item.Active || undefined,
				onclick: this.#handleClick
			}) as const
	);
	state = $derived.by(() => ({
		active: this.item.Active,
		disabled: this.item.disabled
	}));
}

//
// Content
//
class AccordionContentState {
	item: AccordionItemState;
	root: AccordionRootState;

	constructor(item: AccordionItemState, root: AccordionRootState) {
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
const rootContext = buildContext(AccordionRootState);
const itemContext = buildContext(AccordionItemState);

export const createAccordionRootContext = (props: AccordionRootStateProps) => {
	return rootContext.createContext(props);
};
export const createAccordionItemContext = (props: AccordionItemStateProps) => {
	return itemContext.createContext(rootContext.getContext(), props);
};
export const useAccordionHeading = (props: AccordionHeadingStateProps) => {
	return rootContext.register(AccordionHeadingState, props);
};
export const useAccordionButton = () => {
	return itemContext.register(AccordionButtonState, rootContext.getContext());
};
export const useAccordionContent = () => {
	return itemContext.register(AccordionContentState, rootContext.getContext());
};
