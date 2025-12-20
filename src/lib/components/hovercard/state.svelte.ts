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

import type { GetInternalProps, GetInternalPropsNoId } from '$lib/internals/index.js';
import type {
	HovercardArrowProps,
	HovercardContentProps,
	HovercardProps,
	HovercardTriggerProps
} from '$lib/types/index.js';

const { attrs } = createAttributes('hovercard', ['trigger', 'content', 'arrow']);

//
// ~~ROOT
//
type RootProps = GetInternalPropsNoId<HovercardProps>;
class HovercardRoot extends Floating {
	$visible: RootProps['visible'];
	$disabled: RootProps['disabled'];
	$delay: RootProps['delay'];
	$portalTarget: RootProps['portalTarget'];
	$floatingConfig: RootProps['floatingConfig'];

	sharedIds = new SvelteMap<'trigger' | 'content', string>();
	timeout = trackTimeout();
	hovered = $state<boolean>(false);

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
			if (!this.hovered) this.$visible.val = false;
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
type TriggerProps = GetInternalProps<HovercardTriggerProps>;
class HovercardTrigger {
	#id: string;

	_root: HovercardRoot;

	constructor(root: HovercardRoot, props: TriggerProps) {
		this._root = root;
		this.#id = props.id;
	}

	props = $derived.by(() => ({
		id: this.#id,
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
type ContentProps = GetInternalProps<HovercardContentProps>;
class HovercardContent {
	#id: string;

	_root: HovercardRoot;

	constructor(root: HovercardRoot, props: ContentProps) {
		this._root = root;
		this.#id = props.id;

		this._root.sharedIds.set('trigger', this.#id);
	}

	props = $derived.by(() => ({
		id: this.#id,
		[attrs.content]: '',
		...attach((node) => {
			this._root.content = node;

			const floatingCleanUp = floating(this._root.trigger, this._root.arrow, this._root.$floatingConfig.val)(node);
			const portalCleanUp = portal(this._root.$portalTarget.val)(node);
			const eventsCleanUp = addEvents(node, {
				mouseenter: () => {
					this._root.hovered = true;
					this._root.timeout.clear();
				},
				mouseleave: () => {
					this._root.hovered = false;
					this._root.close();
				}
			});

			return () => {
				floatingCleanUp?.();
				portalCleanUp?.();
				eventsCleanUp?.();
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
type ArrowProps = GetInternalProps<HovercardArrowProps>;
class HovercardArrow {
	$id: ArrowProps['id'];

	_root: HovercardRoot;

	constructor(root: HovercardRoot, props: ArrowProps) {
		this._root = root;

		this.$id = props.id;
	}

	props = $derived.by(() => ({
		id: this.$id,
		[attrs.arrow]: '',
		...attach((node) => {
			this._root.arrow = node;
		})
	}));

	state = $derived.by(() => ({
		visible: this._root.$visible.val
	}));
}

//
// ~~BUILDERS
//
const rootContext = buildContext(HovercardRoot);

export const createHovercardRootContext = (props: RootProps) => {
	return rootContext.create(props);
};
export const useHovercardTrigger = (props: TriggerProps) => {
	return rootContext.register(HovercardTrigger, props);
};
export const useHovercardArrow = (props: ArrowProps) => {
	return rootContext.register(HovercardArrow, props);
};
export const useHovercardContent = (props: ContentProps) => {
	return rootContext.register(HovercardContent, props);
};
