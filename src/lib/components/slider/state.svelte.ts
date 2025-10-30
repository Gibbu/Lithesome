import {
	addEvents,
	ALL_ARROW_KEYS,
	buildContext,
	clamp,
	createAttachment,
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
	$min: RootProps['min'];
	$max: RootProps['max'];
	$step: RootProps['step'];
	$value: RootProps['value'];
	$orientation: RootProps['orientation'];
	$reverse: RootProps['reverse'];
	$disabled: RootProps['disabled'];

	id: string;
	dragging = $state<boolean>(false);
	trackElement = $state<HTMLElement | null>(null);
	thumbElement = $state<HTMLElement | null>(null);

	Percentage = $derived.by(() =>
		Math.round(((this.$value.val - this.$min.val) / (this.$max.val - this.$min.val)) * 100)
	);

	constructor(props: RootProps) {
		this.$min = props.min;
		this.$max = props.max;
		this.$step = props.step;
		this.$value = props.value;
		this.$orientation = props.orientation;
		this.$reverse = props.reverse;
		this.$disabled = props.disabled;
		this.id = props.id;

		$effect(() => {
			if (this.$disabled.val || !this.trackElement) return;

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

		const position = this.$orientation.val === 'horizontal' ? clientX : clientY;
		const length = this.$orientation.val === 'horizontal' ? width : height;
		const start =
			this.$orientation.val === 'horizontal' ? (this.$reverse.val ? right : left) : this.$reverse.val ? top : bottom;

		this.$value.val = clamp(
			this.$min.val,
			Math.round(
				((this.$max.val - this.$min.val) *
					((position - start) / length) *
					(this.$reverse.val ? -1 : 1) *
					(this.$orientation.val === 'vertical' ? -1 : 1)) /
					this.$step.val
			) * this.$step.val,
			this.$max.val
		);
	};

	stepUp = () => {
		this.$value.val = clamp(this.$min.val, (this.$value.val += this.$step.val), this.$max.val);
	};
	stepDown = () => {
		this.$value.val = clamp(this.$min.val, (this.$value.val -= this.$step.val), this.$max.val);
	};

	attrs = $derived.by(() => ({
		id: this.id,
		tabindex: -1,
		role: 'none',
		[attrs.root]: '',
		'data-value': this.$value.val,
		'data-percentage': this.Percentage,
		'data-reversed': this.$reverse.val || undefined,
		'data-orientation': this.$orientation.val,
		...createAttachment((node) => {
			this.trackElement = node;

			return addEvents(node, {
				pointerdown: () => {
					if (this.$disabled.val) return;

					this.dragging = true;
				},
				click: (e) => {
					if (this.$disabled.val) return;

					e.preventDefault();
					this.dragging = true;
					this.calculateValue(e);
					this.dragging = false;
				}
			});
		})
	}));

	state = $derived.by(() => ({
		value: this.$value.val,
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
	_root: SliderRoot;

	id: string;

	constructor(root: SliderRoot, props: ThumbProps) {
		this._root = root;
		this.id = props.id;
	}

	attrs = $derived.by(() => ({
		id: this.id,
		role: 'slider',
		tabindex: 0,
		'aria-valuenow': this._root.$value.val,
		'aria-valuemin': this._root.$min.val,
		'aria-valuemax': this._root.$max.val,
		'data-sliderthumb': '',
		...createAttachment((node) => {
			this._root.thumbElement = node;

			return addEvents(node, {
				pointerdown: (e) => {
					if (this._root.$disabled.val) return;

					e.preventDefault();
				},
				keydown: (e) => {
					if (this._root.$disabled.val) return;

					const { key } = e;
					if (ALL_ARROW_KEYS.includes(key)) e.preventDefault();

					if (key === KEYS.arrowRight || key === KEYS.arrowUp) {
						if (this._root.$reverse.val) this._root.stepDown();
						else this._root.stepUp();
					}
					if (key === KEYS.arrowLeft || key === KEYS.arrowDown) {
						if (this._root.$reverse.val) this._root.stepUp();
						else this._root.stepDown();
					}
				}
			});
		})
	}));

	state = $derived.by(() => ({
		value: this._root.$value.val,
		percentage: this._root.Percentage
	}));
}

//
// ~RANGE
//
type RangeProps = GetInternalProps<SliderRangeProps>;
class SliderRange {
	_root: SliderRoot;

	id: string;

	constructor(root: SliderRoot, props: ThumbProps) {
		this._root = root;
		this.id = props.id;
	}

	attrs = $derived.by(() => ({
		id: this.id,
		tabindex: -1,
		role: 'none',
		'data-sliderrange': '',
		'data-value': this._root.$value.val,
		'data-percentage': this._root.Percentage,
		'data-reversed': this._root.$reverse.val || undefined,
		'data-orientation': this._root.$orientation.val,
		...createAttachment((node) => {
			this._root.thumbElement = node;
		})
	}));

	state = $derived.by(() => ({
		value: this._root.$value.val,
		percentage: this._root.Percentage
	}));
}

//
// ~VALUE
//
type ValueProps = GetInternalProps<SliderValueProps>;
class SliderValue {
	_root: SliderRoot;

	id: string;

	constructor(root: SliderRoot, props: ValueProps) {
		this._root = root;
		this.id = props.id;
	}
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
