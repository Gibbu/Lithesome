import { tick } from 'svelte';
import { attach, buildContext, KEYS, PREVENT_KEYS } from '$lib/internals/index.js';
import { addEvents, createAttributes } from '$lib/internals/utils.svelte.js';

import type { GetInternalProps } from '$lib/internals/types.js';
import type { CalcIndexAction } from '$lib/internals/utils.svelte.js';
import type {
	StepperItemProps,
	StepperItemState,
	StepperJumpProps,
	StepperJumpState,
	StepperLinkProps,
	StepperLinkState,
	StepperNextProps,
	StepperNextState,
	StepperPrevProps,
	StepperPrevState,
	StepperProps,
	StepperState,
	StepperStepsProps,
	StepperStepsState
} from '$lib/types/index.js';

const { attrs, selectors } = createAttributes('stepper', ['root', 'steps', 'link', 'item', 'prev', 'next', 'jump']);

interface Item {
	name: string;
	canGoNext?: () => boolean;
}

//
// ~ROOT
//
type RootProps = GetInternalProps<StepperProps>;
class StepperRoot {
	$$: RootProps;

	items = $state<Item[]>([]);
	prevIndex = $state<number>(0);

	Index = $derived.by(() => (this.$$.step.val ? this.items.findIndex((item) => item.name === this.$$.step.val) : 0));
	CurrentItem = $derived.by<Item | null>(() => this.items[this.Index] || null);
	PreviousItem = $derived.by<Item | null>(() => this.items[this.prevIndex] || null);

	IsLast = $derived.by(() => this.Index === this.items.length - 1);
	IsFirst = $derived.by(() => this.Index === 0);

	constructor(props: RootProps) {
		this.$$ = props;

		$effect(() => {
			if (this.CurrentItem) this.$$.step.val = this.CurrentItem.name;
		});

		$effect(() => {
			if (this.CurrentItem) {
				if (this.Index > this.prevIndex) this.$$.onNextStep?.(this.CurrentItem.name);
				else if (this.Index < this.prevIndex) this.$$.onPrevStep?.(this.CurrentItem.name);
			}
		});
	}

	jumpToStep = (name: string, skipCanDoNext: boolean) => {
		let targetIndex = this.items.findIndex((item) => item.name === name);
		if (!skipCanDoNext) {
			const stepsBefore = this.items.slice(0, targetIndex);

			for (let i = 0; i < stepsBefore.length; i++) {
				const step = stepsBefore[i];
				if (step.canGoNext && !step.canGoNext()) {
					targetIndex = i;
					break;
				}
			}
		}

		this.prevIndex = this.Index;
		this.Index = targetIndex;
	};
	registerItem = (name: string, canGoNext?: () => boolean) => {
		if (!this.items.find((item) => item.name === name)) this.items.push({ name, canGoNext });
	};

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.root]: ''
	}));

	state = $derived.by<StepperState>(() => ({
		previousStep: this.PreviousItem?.name,
		previousStepIndex: this.prevIndex,
		currentStep: this.CurrentItem?.name,
		currentStepIndex: this.Index,
		disabled: this.$$.disabled.val,
		isFirstStep: this.IsFirst,
		isLastStep: this.IsLast
	}));
}

//
// ~STEPS
//
type StepsProps = GetInternalProps<StepperStepsProps>;
class StepperSteps {
	$$: StepsProps;

	_root: StepperRoot;

	constructor(root: StepperRoot, props: StepsProps) {
		this._root = root;
		this.$$ = props;
	}

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.steps]: '',
		role: 'navigation'
	}));

	state = $derived.by<StepperStepsState>(() => ({
		currentStepIndex: this._root.Index
	}));
}

//
// ~LINK
//
type LinkProps = GetInternalProps<StepperLinkProps>;
class StepperLink {
	$$: LinkProps;

	_root: StepperRoot;

	Disabled = $derived.by(() => this._root.$$.disabled.val || this.$$.disabled.val);
	Active = $derived.by(() => this._root.CurrentItem?.name === this.$$.item.val);
	ThisIndex = $derived.by(() => this._root.items.findIndex((item) => item.name === this.$$.item.val));

	constructor(root: StepperRoot, props: LinkProps) {
		this._root = root;
		this.$$ = props;
	}

	keyboardMove = (action: CalcIndexAction) => {
		let nextItem: Item | null = null;

		if (action === 'first') nextItem = this._root.items[0];
		if (action === 'last') nextItem = this._root.items[this._root.items.length - 1];
		if (action === 'prev' && this._root.Index > 0) nextItem = this._root.items[this._root.Index - 1];
		if (action === 'next' && this._root.Index !== this._root.items.length - 1)
			nextItem = this._root.items[this._root.Index + 1];

		if (nextItem) {
			this._root.jumpToStep(nextItem.name, this.$$.skipCanDoNext.val);
			tick().then(() => {
				const query = document.querySelector(
					`#${this._root.$$.id.val} ${selectors.steps} [data-item-name="${this._root.$$.step.val}"]`
				) as HTMLButtonElement;
				if (query) query.focus();
			});
		}
	};

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.link]: '',
		'aria-disabled': this.$$.disabled.val,
		'aria-current': this.Active ? 'step' : undefined,
		tabindex: this.Active ? 0 : -1,
		...attach((node) =>
			addEvents(node, {
				click: () => {
					if (this.Disabled) return;
					this._root.jumpToStep(this.$$.item.val, this.$$.skipCanDoNext.val);
				},
				keydown: (e) => {
					if (PREVENT_KEYS.includes(e.key)) e.preventDefault();
					if (this.Disabled) return;

					if (e.key === KEYS.home) this.keyboardMove('first');
					if (e.key === KEYS.end) this.keyboardMove('last');

					if (this._root.$$.orientation.val === 'horizontal') {
						if (e.key === KEYS.arrowLeft) this.keyboardMove('prev');
						if (e.key === KEYS.arrowRight) this.keyboardMove('next');
					} else {
						if (e.key === KEYS.arrowUp) this.keyboardMove('prev');
						if (e.key === KEYS.arrowDown) this.keyboardMove('next');
					}
				}
			})
		)
	}));

	state = $derived.by<StepperLinkState>(() => ({
		currentStepIndex: this.ThisIndex,
		active: this.Active,
		itemName: this.$$.item.val
	}));
}

//
// ~ITEM
//
type ItemProps = GetInternalProps<StepperItemProps>;
class StepperItem {
	$$: ItemProps;

	_root: StepperRoot;

	ThisIndex = $derived.by(() => this._root.items.findIndex((item) => item.name === this.$$.name.val));

	constructor(root: StepperRoot, props: ItemProps) {
		this._root = root;
		this.$$ = props;

		this._root.registerItem(this.$$.name.val, this.$$.canGoNext);
	}

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.item]: ''
	}));

	state = $derived.by<StepperItemState>(() => ({
		index: this.ThisIndex,
		name: this.$$.name.val
	}));
}

//
// ~PREV
//
type PrevProps = GetInternalProps<StepperPrevProps>;
class StepperPrev {
	$$: PrevProps;

	_root: StepperRoot;

	Disabled = $derived.by(() => this._root.$$.disabled.val || this.$$.disabled.val || this._root.IsFirst);

	constructor(root: StepperRoot, props: PrevProps) {
		this._root = root;
		this.$$ = props;
	}

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.prev]: '',
		...attach((node) =>
			addEvents(node, {
				click: () => {
					if (this.Disabled) return;
					if (this._root.Index > 0) {
						this._root.prevIndex = this._root.Index;
						this._root.Index--;
					}
				}
			})
		)
	}));

	state = $derived.by<StepperPrevState>(() => ({
		disabled: this.Disabled,
		canGoPrev: !this._root.IsFirst
	}));
}

//
// ~NEXT
//
type NextProps = GetInternalProps<StepperNextProps>;
class StepperNext {
	$$: NextProps;

	_root: StepperRoot;

	Disabled = $derived.by(() => this._root.$$.disabled.val || this.$$.disabled.val || this._root.IsLast);
	CanGoNext = $derived.by(() =>
		this._root.CurrentItem?.canGoNext ? this._root.CurrentItem.canGoNext() && !this.Disabled : !this.Disabled
	);

	constructor(root: StepperRoot, props: NextProps) {
		this._root = root;
		this.$$ = props;
	}

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.next]: '',
		...attach((node) =>
			addEvents(node, {
				click: () => {
					if (this.Disabled) return;
					if (this.CanGoNext && this._root.Index < this._root.items.length - 1) {
						this._root.prevIndex = this._root.Index;
						this._root.Index++;
					}
				}
			})
		)
	}));

	state = $derived.by<StepperNextState>(() => ({
		disabled: this.Disabled || !this.CanGoNext,
		canGoNext: this.CanGoNext
	}));
}

//
// ~JUMP
//
type JumpProps = GetInternalProps<StepperJumpProps>;
class StepperJump {
	$$: JumpProps;

	_root: StepperRoot;

	Disabled = $derived.by(() => this._root.$$.disabled.val || this.$$.disabled.val);

	constructor(root: StepperRoot, props: JumpProps) {
		this._root = root;
		this.$$ = props;
	}

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.jump]: '',
		...attach((node) =>
			addEvents(node, {
				click: () => {
					if (this.Disabled) return;
					this._root.jumpToStep(this.$$.name.val, this.$$.skipCanDoNext.val);
				}
			})
		)
	}));

	state = $derived.by<StepperJumpState>(() => ({
		disabled: this.Disabled
	}));
}

//
// ~BUILDERS
//
const rootCtx = buildContext(StepperRoot);

export const createStepperRootContext = (props: RootProps) => {
	return rootCtx.create(props);
};

export const useStepperSteps = (props: StepsProps) => {
	return rootCtx.register(StepperSteps, props);
};

export const useStepperLink = (props: LinkProps) => {
	return rootCtx.register(StepperLink, props);
};

export const useStepperItem = (props: ItemProps) => {
	return rootCtx.register(StepperItem, props);
};

export const useStepperPrev = (props: PrevProps) => {
	return rootCtx.register(StepperPrev, props);
};

export const useStepperNext = (props: NextProps) => {
	return rootCtx.register(StepperNext, props);
};

export const useStepperJump = (props: JumpProps) => {
	return rootCtx.register(StepperJump, props);
};
