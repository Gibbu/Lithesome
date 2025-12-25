import { attach, buildContext } from '$lib/internals/index.js';
import { addEvents, createAttributes } from '$lib/internals/utils.svelte.js';

import type { GetInternalProps } from '$lib/internals/types.js';
import type {
	StepperItemProps,
	StepperJumpProps,
	StepperNextProps,
	StepperPrevProps,
	StepperProps
} from '$lib/types/index.js';

const { attrs } = createAttributes('stepper', ['root', 'item', 'prev', 'next']);

interface Item {
	id: string;
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

	Index = $derived.by(() => (this.$$.step.val ? this.items.findIndex((item) => item.id === this.$$.step.val) : 0));
	CurrentItem = $derived.by<Item | null>(() => this.items[this.Index] || null);
	IsLast = $derived.by(() => this.Index === this.items.length - 1);
	IsFirst = $derived.by(() => this.Index === 0);

	constructor(props: RootProps) {
		this.$$ = props;
	}

	next = () => {
		if (this.Index < this.items.length - 1) {
			this.prevIndex = this.Index;
			this.Index++;
		}
	};
	prev = () => {
		if (this.Index > 0) {
			this.prevIndex = this.Index;
			this.Index--;
		}
	};
	jump = (index: number) => {
		this.Index = index;
	};
	registerItem = (id: string, canGoNext?: () => boolean) => {
		if (!this.items.find((item) => item.id === id)) this.items.push({ id, canGoNext });
	};

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.root]: ''
	}));

	state = $derived.by(() => ({
		previousIndex: this.prevIndex,
		currentStep: this.CurrentItem?.id,
		currentStepIndex: this.Index,
		disabled: this.$$.disabled.val,
		isFirstStep: this.IsFirst,
		isLastStep: this.IsLast
	}));
}

//
// ~ITEM
//
type ItemProps = GetInternalProps<StepperItemProps>;
class StepperItem {
	$$: ItemProps;

	_root: StepperRoot;

	constructor(root: StepperRoot, props: ItemProps) {
		this._root = root;
		this.$$ = props;

		this._root.registerItem(this.$$.name.val, this.$$.canGoNext);
	}

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.item]: ''
	}));

	state = $derived.by(() => ({
		stepIndex: 0
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
					this._root.prev();
				}
			})
		)
	}));

	state = $derived.by(() => ({
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
					if (this.CanGoNext) this._root.next();
				}
			})
		)
	}));

	state = $derived.by(() => ({
		disabled: this.Disabled || !this.CanGoNext,
		canGoNext: this.CanGoNext
	}));
}

//
// ~NEXT
//
type JumpProps = GetInternalProps<StepperJumpProps>;
class StepperJump {
	$$: JumpProps;

	_root: StepperRoot;

	Disabled = $derived.by(() => this._root.$$.disabled.val || this.$$.disabled.val || this._root.IsLast);

	constructor(root: StepperRoot, props: JumpProps) {
		this._root = root;
		this.$$ = props;
	}

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.next]: '',
		...attach((node) =>
			addEvents(node, {
				click: () => {
					let targetIndex = this._root.items.findIndex((item) => item.id === this.$$.name.val);
					if (!this.$$.skipCanDoNext.val) {
						const stepsBefore = this._root.items.slice(0, targetIndex);

						for (let i = 0; i < stepsBefore.length; i++) {
							const step = stepsBefore[i];
							if (step.canGoNext && !step.canGoNext()) {
								targetIndex = this._root.items.findIndex((item) => item.id === step.id);
								break;
							}
						}
					}

					this._root.jump(targetIndex);
				}
			})
		)
	}));

	state = $derived.by(() => ({
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
