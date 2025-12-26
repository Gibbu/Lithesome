import {
	addEvents,
	ALL_ARROW_KEYS,
	attach,
	buildContext,
	clamp,
	createAttributes,
	KEYS
} from '$lib/internals/index.js';

import type { GetInternalProps } from '$lib/internals/index.js';
import type {
	SliderProps,
	SliderRangeProps,
	SliderThumbProps,
	SliderValueProps
} from '$lib/types/components/slider.js';

const { attrs } = createAttributes('slider', ['root', 'thumb', 'range', 'value']);

//
// ~ROOT
//
type RootProps = GetInternalProps<SliderProps>;
class SliderRoot {
	$$: RootProps;

	dragging = $state<boolean>(false);
	trackElement = $state<HTMLElement | null>(null);
	thumbElement = $state<HTMLElement | null>(null);

	Percentage = $derived.by(() =>
		Math.round(((this.$$.value.val - this.$$.min.val) / (this.$$.max.val - this.$$.min.val)) * 100)
	);

	constructor(props: RootProps) {
		this.$$ = props;

		$effect(() => {
			if (this.$$.disabled.val || !this.trackElement) return;

			document.addEventListener('pointerup', (e) => this.loseFocus(e));
			document.addEventListener('pointermove', (e) => {
				if (this.dragging) this.calculateValue(e);
			});

			return () => {
				document.removeEventListener('pointerup', (e) => this.loseFocus(e));
				document.removeEventListener('pointermove', (e) => this.calculateValue(e));
			};
		});
	}

	loseFocus = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		if (target !== this.trackElement || (this.thumbElement && !target.contains(this.thumbElement)))
			this.dragging = false;
	};

	calculateValue = (e: MouseEvent) => {
		if (!this.dragging || !this.trackElement) return;

		const { clientX, clientY } = e;
		const { width, height, left, right, top, bottom } = this.trackElement.getBoundingClientRect();

		const position = this.$$.orientation.val === 'horizontal' ? clientX : clientY;
		const length = this.$$.orientation.val === 'horizontal' ? width : height;
		const start =
			this.$$.orientation.val === 'horizontal'
				? this.$$.reverse.val
					? right
					: left
				: this.$$.reverse.val
					? top
					: bottom;

		this.$$.value.val = clamp(
			this.$$.min.val,
			Math.round(
				((this.$$.max.val - this.$$.min.val) *
					((position - start) / length) *
					(this.$$.reverse.val ? -1 : 1) *
					(this.$$.orientation.val === 'vertical' ? -1 : 1)) /
					this.$$.step.val
			) * this.$$.step.val,
			this.$$.max.val
		);
	};

	stepUp = () => {
		this.$$.value.val = clamp(this.$$.min.val, (this.$$.value.val += this.$$.step.val), this.$$.max.val);
	};
	stepDown = () => {
		this.$$.value.val = clamp(this.$$.min.val, (this.$$.value.val -= this.$$.step.val), this.$$.max.val);
	};

	props = $derived.by(() => ({
		id: this.$$.id.val,
		tabindex: -1,
		role: 'none',
		[attrs.root]: '',
		'data-reversed': this.$$.reverse.val || undefined,
		'data-orientation': this.$$.orientation.val,
		...attach((node) => {
			this.trackElement = node;

			return addEvents(node, {
				pointerdown: () => {
					if (this.$$.disabled.val) return;

					this.dragging = true;
				},
				click: (e) => {
					if (this.$$.disabled.val) return;

					e.preventDefault();
					this.dragging = true;
					this.calculateValue(e);
					this.dragging = false;
				}
			});
		})
	}));

	state = $derived.by(() => ({
		/**
		 * The current value.
		 */
		value: this.$$.value.val,
		/**
		 * The current percentage from 0 to 100.
		 */
		percentage: this.Percentage
	}));

	styles = $derived.by(() => ({
		'--slider-percentage': this.Percentage + '%'
	}));
}

//
// ~THUMB
//
type ThumbProps = GetInternalProps<SliderThumbProps>;
class SliderThumb {
	$$: ThumbProps;

	_root: SliderRoot;

	constructor(root: SliderRoot, props: ThumbProps) {
		this._root = root;
		this.$$ = props;
	}

	props = $derived.by(() => ({
		id: this.$$.id.val,
		role: 'slider',
		tabindex: 0,
		'aria-valuenow': this._root.$$.value.val,
		'aria-valuemin': this._root.$$.min.val,
		'aria-valuemax': this._root.$$.max.val,
		'data-sliderthumb': '',
		...attach((node) => {
			this._root.thumbElement = node;

			return addEvents(node, {
				pointerdown: (e) => {
					if (this._root.$$.disabled.val) return;

					e.preventDefault();
				},
				keydown: (e) => {
					if (this._root.$$.disabled.val) return;

					const { key } = e;
					if (ALL_ARROW_KEYS.includes(key)) e.preventDefault();

					if (key === KEYS.arrowRight || key === KEYS.arrowUp) {
						if (this._root.$$.reverse.val) this._root.stepDown();
						else this._root.stepUp();
					}
					if (key === KEYS.arrowLeft || key === KEYS.arrowDown) {
						if (this._root.$$.reverse.val) this._root.stepUp();
						else this._root.stepDown();
					}
				}
			});
		})
	}));

	state = $derived.by(() => ({
		/**
		 * The current value.
		 */
		value: this._root.$$.value.val,
		/**
		 * The current percentage from 0 to 100.
		 */
		percentage: this._root.Percentage
	}));
}

//
// ~RANGE
//
type RangeProps = GetInternalProps<SliderRangeProps>;
class SliderRange {
	$$: RangeProps;

	_root: SliderRoot;

	constructor(root: SliderRoot, props: ThumbProps) {
		this._root = root;
		this.$$ = props;
	}

	props = $derived.by(() => ({
		id: this.$$.id.val,
		tabindex: -1,
		role: 'none',
		'data-sliderrange': '',
		'data-reversed': this._root.$$.reverse.val || undefined,
		'data-orientation': this._root.$$.orientation.val,
		...attach((node) => {
			this._root.thumbElement = node;
		})
	}));

	state = $derived.by(() => ({
		/**
		 * The current value.
		 */
		value: this._root.$$.value.val,
		/**
		 * The current percentage from 0 to 100.
		 */
		percentage: this._root.Percentage
	}));
}

//
// ~VALUE
//
type ValueProps = GetInternalProps<SliderValueProps>;
class SliderValue {
	$$: ValueProps;

	_root: SliderRoot;

	constructor(root: SliderRoot, props: ValueProps) {
		this._root = root;
		this.$$ = props;
	}

	props = $derived.by(
		() =>
			({
				id: this.$$.id.val,
				[attrs.value]: '',
				'aria-hidden': 'false',
				min: this._root.$$.min.val,
				max: this._root.$$.max.val,
				step: this._root.$$.step.val,
				value: this._root.$$.value.val
			}) as const
	);
	state = $derived.by(() => ({
		/**
		 * The current value.
		 */
		value: this._root.$$.value.val,
		/**
		 * The current percentage from 0 to 100.
		 */
		percentage: this._root.Percentage
	}));
	styles = $derived.by(() => ({
		display: 'none'
	}));
}

//
// ~BUILDERS
//
const rootCtx = buildContext(SliderRoot);

export const createSliderRootContext = (props: RootProps) => {
	return rootCtx.create(props);
};

export const useSliderThumb = (props: ThumbProps) => {
	return rootCtx.register(SliderThumb, props);
};

export const useSliderRange = (props: RangeProps) => {
	return rootCtx.register(SliderRange, props);
};

export const useSliderValue = (props: ValueProps) => {
	return rootCtx.register(SliderValue, props);
};
