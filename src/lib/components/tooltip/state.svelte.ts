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

	sharedIds = new Map<'trigger' | 'content', string>();
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
class TooltipTrigger {
	_root: TooltipRoot;

	constructor(root: TooltipRoot) {
		this._root = root;
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
class TooltipContent {
	_root: TooltipRoot;

	constructor(root: TooltipRoot) {
		this._root = root;
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
// ~~ARROW
//
class TooltipArrow {
	_root: TooltipRoot;

	constructor(root: TooltipRoot) {
		this._root = root;
	}

	props = {
		[attrs.arrow]: '',
		...attach((node) => {
			this._root.arrow = node;
		})
	};

	state = $derived.by(() => ({
		visible: this._root.$visible.val
	}));
}

//
// ~~BUILDERS
//
const rootContext = buildContext(TooltipRoot);

export const createTooltipRootContext = (props: RootProps) => {
	return rootContext.create(props);
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
