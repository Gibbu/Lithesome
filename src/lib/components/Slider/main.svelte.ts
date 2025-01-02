import { ALL_ARROW_KEYS, buildContext, clamp, createUID, KEYS, type Orientation, type StateValues } from '$internal';
import type { SliderEvents, SliderState, SliderThumbEvents } from './types.js';

//
// Root
//
type SliderRootProps = StateValues<{
	min: number;
	max: number;
	step: number;
	value: number;
	orientation: Orientation;
	reverse: boolean;
	disabled: boolean;
	trackElement: HTMLDivElement | undefined;
}>;
class SliderRoot {
	uid = createUID('slider');

	#events: SliderEvents;

	$min: SliderRootProps['min'];
	$max: SliderRootProps['max'];
	$step: SliderRootProps['step'];
	$value: SliderRootProps['value'];
	$orientation: SliderRootProps['orientation'];
	$reverse: SliderRootProps['reverse'];
	$disabled: SliderRootProps['disabled'];
	$trackElement: SliderRootProps['trackElement'];

	thumbElement = $state<HTMLDivElement | undefined>(undefined);
	dragging = $state<boolean>(false);

	Percentage = $derived.by(() =>
		Math.round(((this.$value.val - this.$min.val) / (this.$max.val - this.$min.val)) * 100)
	);

	constructor(props: SliderRootProps, events: SliderEvents) {
		this.#events = events;

		this.$min = props.min;
		this.$max = props.max;
		this.$step = props.step;
		this.$value = props.value;
		this.$orientation = props.orientation;
		this.$reverse = props.reverse;
		this.$disabled = props.disabled;
		this.$trackElement = props.trackElement;

		$effect(() => {
			if (this.$disabled.val || !this.$trackElement.val) return;

			document.addEventListener('mouseup', (e) => this.loseFocus(e));
			document.addEventListener('mousemove', (e) => this.calculateValue(e));

			return () => {
				document.removeEventListener('mouseup', (e) => this.loseFocus(e));
				document.removeEventListener('mousemove', (e) => this.calculateValue(e));
			};
		});
	}

	stepUp = () => {
		this.$value.val = clamp(this.$min.val, (this.$value.val += this.$step.val), this.$max.val);
	};
	stepDown = () => {
		this.$value.val = clamp(this.$min.val, (this.$value.val -= this.$step.val), this.$max.val);
	};

	loseFocus = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		if (target !== this.$trackElement.val || (this.thumbElement && !target.contains(this.thumbElement)))
			this.dragging = false;
	};
	calculateValue = (e: MouseEvent) => {
		if (!this.dragging || !this.$trackElement.val) return;

		const { clientX, clientY } = e;
		const { width, height, left, right, top, bottom } = this.$trackElement.val.getBoundingClientRect();

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

	#handleMousedown: SliderEvents['onMousedown'] = (e) => {
		if (this.$disabled.val) return;
		this.#events.onMousedown?.(e);

		this.dragging = true;
	};
	#handleClick: SliderEvents['onClick'] = (e) => {
		if (this.$disabled.val) return;
		this.#events.onClick?.(e);

		e.preventDefault();
		this.dragging = true;
		this.calculateValue(e);
		this.dragging = false;
	};

	attrs = $derived.by(() => ({
		id: this.uid(),
		tabindex: -1,
		role: 'none',
		'data-slider': '',
		'data-value': this.$value.val,
		'data-percentage': this.Percentage,
		'data-reversed': this.$reverse.val || undefined,
		'data-orientation': this.$orientation.val,
		onmousedown: this.#handleMousedown,
		onclick: this.#handleClick
	}));
	state = $derived.by<SliderState>(() => ({
		value: this.$value.val,
		percentage: this.Percentage
	}));
}

//
// Range
//
class SliderRange {
	_root: SliderRoot;

	constructor(_root: SliderRoot) {
		this._root = _root;
	}

	styles = $derived.by(() => {
		const perc = `${this._root.Percentage}%`;
		let obj = {};

		if (this._root.$orientation.val === 'horizontal') {
			obj = this._root.$reverse.val ? { width: perc, right: '0' } : { width: perc, left: '0' };
		} else if (this._root.$orientation.val === 'vertical') {
			obj = this._root.$reverse.val ? { height: perc, top: '0' } : { height: perc, bottom: '0' };
		}

		return Object.entries(obj)
			.map(([k, v]) => `${k}:${v}`)
			.join(';');
	});
	attrs = $derived.by(() => ({
		id: this._root.uid('range'),
		tabindex: -1,
		role: 'none',
		'data-sliderrange': '',
		'data-value': this._root.$value.val,
		'data-percentage': this._root.Percentage,
		'data-reversed': this._root.$reverse.val || undefined,
		'data-orientation': this._root.$orientation.val,
		style: `position: absolute; ${this.styles}`
	}));
	state = $derived.by<SliderState>(() => ({
		value: this._root.$value.val,
		percentage: this._root.Percentage
	}));
}

//
// Thumb
//
class SliderThumb {
	_root: SliderRoot;
	#events: SliderThumbEvents;

	constructor(_root: SliderRoot, thumbElement: HTMLDivElement | undefined, events: SliderThumbEvents) {
		this._root = _root;
		this.#events = events;

		this._root.thumbElement = thumbElement;
	}

	#handleMousedown: SliderThumbEvents['onMousedown'] = (e) => {
		if (this._root.$disabled.val) return;
		this.#events.onMousedown?.(e);

		e.preventDefault();
	};
	#handleKeydown: SliderThumbEvents['onKeydown'] = (e) => {
		if (this._root.$disabled.val) return;
		this.#events.onKeydown?.(e);

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
	};

	styles = $derived.by(() => {
		const perc = `${this._root.Percentage}%`;
		let translate = '';
		let obj = {};

		if (this._root.$orientation.val === 'horizontal') {
			obj = this._root.$reverse.val ? { right: perc } : { left: perc };
			translate = this._root.$reverse.val ? '50%' : '-50%';
		} else if (this._root.$orientation.val === 'vertical') {
			obj = this._root.$reverse ? { top: perc } : { bottom: perc };
			translate = this._root.$reverse.val ? '0 -50%' : '0 50%';
		}
		obj = { ...obj, translate };

		return Object.entries(obj)
			.map(([k, v]) => `${k}:${v}`)
			.join(';');
	});
	attrs = $derived.by(() => ({
		id: this._root.uid('slider'),
		role: 'slider',
		tabindex: 0,
		'aria-valuenow': this._root.$value.val,
		'aria-valuemin': this._root.$min.val,
		'aria-valuemax': this._root.$max.val,
		'data-sliderthumb': '',
		onmousedown: this.#handleMousedown,
		onkeydown: this.#handleKeydown,
		style: `position: absolute; ${this.styles}`
	}));
	state = $derived.by<SliderState>(() => ({
		value: this._root.$value.val,
		percentage: this._root.Percentage
	}));
}

//
// Value
//
class SliderValue {
	_root: SliderRoot;

	constructor(_root: SliderRoot) {
		this._root = _root;
	}

	attrs = $derived.by(
		() =>
			({
				id: this._root.uid('value'),
				min: this._root.$min.val,
				max: this._root.$max.val,
				step: this._root.$step.val,
				value: this._root.$value.val,
				'aria-hidden': 'false',
				'data-slidervalue': '',
				style: 'display: none;'
			}) as const
	);
	state = $derived.by<SliderState>(() => ({
		value: this._root.$value.val,
		percentage: this._root.Percentage
	}));
}

//
// Builders
//
const builder = buildContext(SliderRoot);

export const createRootContext = (props: SliderRootProps, events: SliderEvents) => {
	return builder.createContext(props, events);
};
export const useSliderRange = () => {
	return builder.register(SliderRange);
};
export const useSliderThumb = (thumbElement: HTMLDivElement | undefined, events: SliderThumbEvents) => {
	return builder.register(SliderThumb, thumbElement, events);
};
export const useSliderValue = () => {
	return builder.register(SliderValue);
};
