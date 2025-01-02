import {
	addEventListeners,
	buildContext,
	createUID,
	Floating,
	setNodeProps,
	trackTimeout,
	type StateValues
} from '$internal';
import type { TooltipState } from './types.js';

//
// Root
//
type TooltipRootProps = StateValues<{
	visible: boolean;
	disabled: boolean;
	delay: { in: number; out: number };
}>;
class TooltipRoot extends Floating {
	uid = createUID('tooltip');

	$visible: TooltipRootProps['visible'];
	$disabled: TooltipRootProps['disabled'];
	$delay: TooltipRootProps['delay'];

	timeout = trackTimeout();

	constructor(props: TooltipRootProps) {
		super('Tooltip');
		this.$disabled = props.disabled;
		this.$visible = props.visible;
		this.$delay = props.delay;
	}

	open = () => {
		this.timeout.set(() => {
			this.$visible.val = true;
		}, this.$delay.val.in);
	};
	close = () => {
		this.timeout.set(() => {
			this.$visible.val = false;
		}, this.$delay.val.out);
	};

	state = $derived.by<TooltipState>(() => ({
		visible: this.$visible.val
	}));
}

//
// Trigger
//
class TooltipTrigger {
	_root: TooltipRoot;

	constructor(_root: TooltipRoot) {
		this._root = _root;

		$effect(() => {
			if (this._root.trigger) {
				const child = this._root.trigger.children[0] as HTMLElement;

				setNodeProps(child, {
					id: this._root.uid('trigger'),
					'aria-describedby': this._root.uid('content')
				});
				addEventListeners(child, {
					mouseenter: () => this._root.open(),
					mouseleave: () => this._root.close(),
					focus: () => this._root.open(),
					blur: () => this._root.close()
				});
			}
		});
	}

	attrs = {
		'data-tooltiptrigger': ''
	};
	state = $derived.by<TooltipState>(() => ({
		visible: this._root.$visible.val
	}));
}

//
// Arrow
//
class TooltipArrow {
	_root: TooltipRoot;

	constructor(_root: TooltipRoot) {
		this._root = _root;
	}

	attrs = $derived.by(() => ({
		id: this._root.uid('arrow')
	}));

	state = $derived.by<TooltipState>(() => ({
		visible: this._root.$visible.val
	}));
}

//
// Content
//
class TooltipContent {
	_root: TooltipRoot;

	constructor(_root: TooltipRoot) {
		this._root = _root;
	}

	state = $derived.by<TooltipState>(() => ({
		visible: this._root.$visible.val
	}));
}

//
// Builder
//
const _rootContext = buildContext(TooltipRoot);

export const createTooltipRootContext = (props: TooltipRootProps) => {
	return _rootContext.createContext(props);
};
export const useTooltipTrigger = () => {
	return _rootContext.register(TooltipTrigger);
};
export const useTooltipArrow = () => {
	return _rootContext.register(TooltipArrow);
};
export const useTooltipContent = () => {
	return _rootContext.register(TooltipContent);
};
