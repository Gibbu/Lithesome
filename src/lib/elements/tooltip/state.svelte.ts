import { SvelteMap } from 'svelte/reactivity';
import { portal } from '$lib/index.js';
import {
	addEvents,
	attach,
	buildContext,
	createAttributes,
	floating,
	Floating,
	parseDelay,
	trackTimeout
} from '$lib/internals/index.js';

import type { GetInternalProps } from '$lib/internals/index.js';
import type { TooltipProps } from '$lib/types/index.js';
import type { TooltipArrowProps } from './types.js';

const { attrs } = createAttributes('tooltip', ['trigger', 'content', 'arrow']);

//
// ~~ROOT
//
type RootProps = GetInternalProps<TooltipProps>;
class TooltipRoot extends Floating {
	$visible: RootProps['visible'];
	$disabled: RootProps['disabled'];
	$delay: RootProps['delay'];
	$portalTarget: RootProps['portalTarget'];
	$floatingConfig: RootProps['floatingConfig'];

	sharedIds = new SvelteMap<'trigger' | 'content', string>();
	timeout = trackTimeout();

	ParsedDelay = $derived.by(() => parseDelay(this.$delay.val));

	constructor(props: RootProps) {
		super();

		this.$visible = props.visible;
		this.$disabled = props.disabled;
		this.$delay = props.delay;
		this.$portalTarget = props.portalTarget;
		this.$floatingConfig = props.floatingConfig;
	}

	open = () => {
		this.timeout.set(() => {
			this.$visible.val = true;
		}, this.ParsedDelay.in);
	};

	close = () => {
		this.timeout.set(() => {
			this.$visible.val = false;
		}, this.ParsedDelay.out);
	};

	props = {};

	state = $derived.by(() => ({
		visible: this.$visible.val
	}));
}

//
// ~~TRIGGER
//
type TriggerProps = GetInternalProps<TooltipArrowProps>;
class TooltipTrigger {
	$id: TriggerProps['id'];

	_root: TooltipRoot;

	constructor(root: TooltipRoot, props: TriggerProps) {
		this._root = root;

		this.$id = props.id;
	}

	props = $derived.by(() => ({
		id: this._root.sharedIds.get('trigger'),
		[attrs.trigger]: '',
		'aria-describedby': this._root.sharedIds.get('content'),
		...attach((node) => {
			this._root.trigger = node;

			return addEvents(node, {
				mouseenter: () => {
					if (this._root.$disabled.val) return;
					this._root.open();
				},
				mouseleave: () => {
					if (this._root.$disabled.val) return;
					this._root.close();
				},
				focus: () => {
					if (this._root.$disabled.val) return;
					this._root.open();
				},
				blur: () => {
					if (this._root.$disabled.val) return;
					this._root.close();
				}
			});
		})
	}));

	state = $derived.by(() => ({
		visible: this._root.$visible.val
	}));
}

//
// ~~CONTENT
//
type ContentProps = GetInternalProps<TooltipArrowProps>;
class TooltipContent {
	$id: ContentProps['id'];

	_root: TooltipRoot;

	constructor(root: TooltipRoot, props: ContentProps) {
		this._root = root;

		this.$id = props.id;
	}

	props = $derived.by(() => ({
		id: this._root.sharedIds.get('content'),
		[attrs.content]: '',
		...attach((node) => {
			this._root.content = node;

			const floatingCleanUp = floating(this._root.trigger, this._root.arrow, this._root.$floatingConfig.val)(node);
			const portalCleanUp = portal(this._root.$portalTarget.val)(node);

			return () => {
				floatingCleanUp?.();
				portalCleanUp?.();
			};
		})
	}));

	state = $derived.by(() => ({
		visible: this._root.$visible.val
	}));
}

//
// ~ARROW
//
type ArrowProps = GetInternalProps<TooltipArrowProps>;
class TooltipArrow {
	id: string;

	_parent: TooltipRoot;

	constructor(parent: TooltipRoot, props: ArrowProps) {
		this._parent = parent;
		this.id = props.id;
	}

	props = $derived.by(() => ({
		id: this.id,
		[attrs.arrow]: '',
		...attach((node) => {
			this._parent.arrow = node;
		})
	}));

	state = $derived.by(() => ({
		visible: this._parent.$visible.val
	}));
}

//
// ~~BUILDERS
//
const rootContext = buildContext(TooltipRoot);

export const createTooltipRootContext = (props: RootProps) => {
	return rootContext.create(props);
};
export const useTooltipTrigger = (props: TriggerProps) => {
	return rootContext.register(TooltipTrigger, props);
};
export const useTooltipArrow = (props: ArrowProps) => {
	return rootContext.register(TooltipArrow, props);
};
export const useTooltipContent = (props: ContentProps) => {
	return rootContext.register(TooltipContent, props);
};
