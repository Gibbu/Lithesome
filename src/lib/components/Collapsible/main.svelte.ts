import { buildContext, createUID, type StateValues } from '$internal';
import type { CollapsibleButtonEvents, CollapsibleState } from './types.js';

//
// Root
//
type CollapsibleRootProps = StateValues<{
	visible: boolean;
	disabled: boolean;
}>;
class CollapsibleRoot {
	uid = createUID('collapsible');

	$visible: CollapsibleRootProps['visible'];
	$disabled: CollapsibleRootProps['disabled'];

	constructor(props: CollapsibleRootProps) {
		this.$visible = props.visible;
		this.$disabled = props.disabled;
	}

	attrs = $derived.by(() => ({
		id: this.uid(),
		'data-collapsible': '',
		'data-disabled': this.$disabled.val || undefined,
		'data-state': this.$visible.val ? 'opened' : 'closed'
	}));

	state = $derived.by<CollapsibleState>(() => ({
		visible: this.$visible.val
	}));
}

//
// Button
//
class CollapsibleButton {
	root: CollapsibleRoot;
	#events: CollapsibleButtonEvents;

	constructor(root: CollapsibleRoot, events: CollapsibleButtonEvents) {
		this.root = root;
		this.#events = events;
	}

	#handleClick: CollapsibleButtonEvents['onClick'] = (e) => {
		if (this.root.$disabled.val) return;
		this.#events.onClick?.(e);

		this.root.$visible.val = !this.root.$visible.val;
	};

	attrs = $derived.by(() => ({
		id: this.root.uid('button'),
		type: 'button',
		'aria-expanded': this.root.$visible.val,
		'data-collapsiblebutton': '',
		'data-disabled': this.root.$disabled.val,
		'data-state': this.root.$visible.val ? 'opened' : 'closed',
		onclick: this.#handleClick
	}));

	state = $derived.by<CollapsibleState>(() => ({
		visible: this.root.$visible.val
	}));
}

//
// Content
//
class CollapsibleContent {
	root: CollapsibleRoot;

	constructor(root: CollapsibleRoot) {
		this.root = root;
	}

	attrs = $derived.by(() => ({
		id: this.root.uid('content'),
		'data-collapsiblecontent': ''
	}));

	state = $derived.by<CollapsibleState>(() => ({
		visible: this.root.$visible.val
	}));
}

// Builders
const rootContext = buildContext(CollapsibleRoot);

export const createCollapsibleRootContext = (props: CollapsibleRootProps) => {
	return rootContext.createContext(props);
};

export const useCollapsibleButton = (events: CollapsibleButtonEvents) => {
	return rootContext.register(CollapsibleButton, events);
};

export const useCollapsibleContent = () => {
	return rootContext.register(CollapsibleContent);
};
