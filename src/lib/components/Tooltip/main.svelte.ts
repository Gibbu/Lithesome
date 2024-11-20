import {
	addEventListeners,
	buildContext,
	createUID,
	Floating,
	removeNodeProps,
	setNodeProps,
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

	#timeout = $state<number | null>(null);

	constructor(props: TooltipRootProps) {
		super('Tooltip');
		this.$disabled = props.disabled;
		this.$visible = props.visible;
		this.$delay = props.delay;
	}

	open() {
		if (this.#timeout) {
			clearTimeout(this.#timeout);
			this.#timeout = null;
		}

		this.#timeout = setTimeout(() => {
			this.$visible.val = true;
		}, this.$delay.val.in);
	}
	close() {
		if (this.#timeout) {
			clearTimeout(this.#timeout);
			this.#timeout = null;
		}
		this.#timeout = setTimeout(() => {
			this.$visible.val = false;
		}, this.$delay.val.out);
	}

	state = $derived.by<TooltipState>(() => ({
		visible: this.$visible.val
	}));
}

//
// Trigger
//
class TooltipTrigger {
	root: TooltipRoot;

	constructor(root: TooltipRoot) {
		this.root = root;

		$effect(() => {
			if (this.root.trigger) {
				const child = this.root.trigger.children[0] as HTMLElement;

				setNodeProps(child, {
					id: this.root.uid('trigger')
				});
				addEventListeners(child, {
					mouseenter: () => this.root.open(),
					mouseleave: () => this.root.close(),
					focus: () => this.root.open(),
					blur: () => this.root.close()
				});

				$effect(() => {
					if (!child) return;

					if (this.root.$visible.val) {
						setNodeProps(child, {
							'aria-describedby': this.root.uid('content')
						});
					} else {
						removeNodeProps(child, 'aria-describedby');
					}
				});
			}
		});
	}

	attrs = {
		'data-tooltiptrigger': ''
	};
	state = $derived.by<TooltipState>(() => ({
		visible: this.root.$visible.val
	}));
}

//
// Arrow
//
class TooltipArrow {
	root: TooltipRoot;

	constructor(root: TooltipRoot) {
		this.root = root;
	}

	attrs = $derived.by(() => ({
		id: this.root.uid('arrow')
	}));

	state = $derived.by<TooltipState>(() => ({
		visible: this.root.$visible.val
	}));
}

//
// Content
//
class TooltipContent {
	root: TooltipRoot;

	constructor(root: TooltipRoot) {
		this.root = root;
	}

	state = $derived.by<TooltipState>(() => ({
		visible: this.root.$visible.val
	}));
}

//
// Builder
//
const rootContext = buildContext(TooltipRoot);

export const createTooltipRootContext = (props: TooltipRootProps) => {
	return rootContext.createContext(props);
};
export const useTooltipTrigger = () => {
	return rootContext.register(TooltipTrigger);
};
export const useTooltipArrow = () => {
	return rootContext.register(TooltipArrow);
};
export const useTooltipContent = () => {
	return rootContext.register(TooltipContent);
};
