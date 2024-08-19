import {
	ALL_ARROW_KEYS,
	buildContext,
	clamp,
	createUID,
	KEYS,
	type Handler,
	type Orientation,
	type RootEvents
} from '$internal';

//
// Root
//
interface SliderRootStateProps extends RootEvents<SliderRootStateProps> {
	min: number;
	max: number;
	step: number;
	value: number;
	orientation: Orientation;
	reverse: boolean;
	disabled: boolean;
	trackElement: HTMLDivElement | undefined;
}
class SliderRootState {
	uid = createUID('slider').uid;
	min = $state<number>(0);
	max = $state<number>(100);
	step = $state<number>(1);
	value = $state<number>(0);
	orientation = $state<Orientation>('vertical');
	reverse = $state<boolean>(false);
	disabled = $state<boolean>(false);

	dragging = $state<boolean>(false);

	trackElement = $state<HTMLDivElement | undefined>(undefined);
	thumbElement = $state<HTMLDivElement | undefined>(undefined);

	Percentage = $derived(Math.round(((this.value - this.min) / (this.max - this.min)) * 100));

	constructor(props: SliderRootStateProps) {
		this.min = props.min;
		this.max = props.max;
		this.step = props.step;
		this.value = props.value;
		this.orientation = props.orientation;
		this.reverse = props.reverse;
		this.disabled = props.disabled;
		this.trackElement = props.trackElement;

		$effect(() => {
			props.onContextChange?.({
				min: this.min,
				max: this.max,
				step: this.step,
				value: this.value,
				orientation: this.orientation,
				disabled: this.disabled,
				reverse: this.reverse,
				trackElement: this.trackElement
			});
		});

		$effect(() => {
			if (this.disabled || !this.trackElement) return;

			document.addEventListener('mouseup', (e) => this.loseFocus(e));
			document.addEventListener('mousemove', (e) => this.calculateValue(e));

			return () => {
				document.removeEventListener('mouseup', (e) => this.loseFocus(e));
				document.removeEventListener('mousemove', (e) => this.calculateValue(e));
			};
		});
	}
	onComponentChange(props: SliderRootStateProps) {
		this.min = props.min;
		this.max = props.max;
		this.step = props.step;
		this.value = props.value;
		this.orientation = props.orientation;
		this.reverse = props.reverse;
		this.disabled = props.disabled;
		this.trackElement = props.trackElement;
	}

	stepUp = () => {
		this.value = clamp(this.min, (this.value += this.step), this.max);
	};
	stepDown = () => {
		this.value = clamp(this.min, (this.value -= this.step), this.max);
	};

	loseFocus = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		if (target !== this.trackElement || (this.thumbElement && !target.contains(this.thumbElement)))
			this.dragging = false;
	};
	calculateValue = (e: MouseEvent) => {
		if (!this.dragging || !this.trackElement) return;

		const { clientX, clientY } = e;
		const { width, height, left, right, top, bottom } = this.trackElement.getBoundingClientRect();

		const position = this.orientation === 'horizontal' ? clientX : clientY;
		const length = this.orientation === 'horizontal' ? width : height;
		const start = this.orientation === 'horizontal' ? (this.reverse ? right : left) : this.reverse ? top : bottom;

		this.value = clamp(
			this.min,
			Math.round(
				((this.max - this.min) *
					((position - start) / length) *
					(this.reverse ? -1 : 1) *
					(this.orientation === 'vertical' ? -1 : 1)) /
					this.step
			) * this.step,
			this.max
		);
	};

	#handleMousedown = () => {
		if (this.disabled) return;
		this.dragging = true;
	};
	#handleClick: Handler<MouseEvent, HTMLDivElement> = (e) => {
		if (this.disabled) return;
		e.preventDefault();
		this.dragging = true;
		this.calculateValue(e);
		this.dragging = false;
	};

	attrs = $derived.by(
		() =>
			({
				id: this.uid(),
				tabindex: -1,
				role: 'none',
				'data-slider': '',
				'data-value': this.value,
				'data-percentage': this.Percentage,
				'data-reversed': this.reverse || undefined,
				'data-orientation': this.orientation,
				onmousedown: this.#handleMousedown,
				onclick: this.#handleClick
			}) as const
	);
	state = $derived.by(() => ({
		value: this.value,
		percentage: this.Percentage
	}));
}

//
// Range
//
class SliderRangeState {
	root: SliderRootState;

	constructor(root: SliderRootState) {
		this.root = root;
	}

	styles = $derived.by(() => {
		const perc = `${this.root.Percentage}%`;
		let obj = {};

		if (this.root.orientation === 'horizontal') {
			obj = this.root.reverse ? { width: perc, right: '0' } : { width: perc, left: '0' };
		} else if (this.root.orientation === 'vertical') {
			obj = this.root.reverse ? { height: perc, top: '0' } : { height: perc, bottom: '0' };
		}

		return Object.entries(obj)
			.map(([k, v]) => `${k}:${v}`)
			.join(';');
	});
	attrs = $derived.by(
		() =>
			({
				id: this.root.uid('range'),
				tabindex: -1,
				role: 'none',
				'data-slider': '',
				'data-value': this.root.value,
				'data-percentage': this.root.Percentage,
				'data-reversed': this.root.reverse || undefined,
				'data-orientation': this.root.orientation,
				style: `position: absolute; ${this.styles}`
			}) as const
	);
	state = $derived.by(() => ({
		value: this.root.value,
		percentage: this.root.Percentage
	}));
}

//
// Thumb
//
class SliderThumbState {
	root: SliderRootState;

	constructor(root: SliderRootState, thumbElement: HTMLDivElement | undefined) {
		this.root = root;
		this.root.thumbElement = thumbElement;
	}

	#handleMousedown: Handler<MouseEvent, HTMLDivElement> = (e) => {
		if (this.root.disabled) return;
		e.preventDefault();
	};
	#handleKeydown: Handler<KeyboardEvent, HTMLDivElement> = (e) => {
		if (this.root.disabled) return;

		const { key } = e;
		if (ALL_ARROW_KEYS.includes(key)) e.preventDefault();

		if (key === KEYS.arrowRight || key === KEYS.arrowUp) {
			if (this.root.reverse) this.root.stepDown();
			else this.root.stepUp();
		}
		if (key === KEYS.arrowLeft || key === KEYS.arrowDown) {
			if (this.root.reverse) this.root.stepUp();
			else this.root.stepDown();
		}
	};

	styles = $derived.by(() => {
		const perc = `${this.root.Percentage}%`;
		let translate = '';
		let obj = {};

		if (this.root.orientation === 'horizontal') {
			obj = this.root.reverse ? { right: perc } : { left: perc };
			translate = this.root.reverse ? '50%' : '-50%';
		} else if (this.root.orientation === 'vertical') {
			obj = this.root.reverse ? { top: perc } : { bottom: perc };
			translate = this.root.reverse ? '0 -50%' : '0 50%';
		}
		obj = { ...obj, translate };

		return Object.entries(obj)
			.map(([k, v]) => `${k}:${v}`)
			.join(';');
	});
	attrs = $derived.by(
		() =>
			({
				id: this.root.uid('slider'),
				role: 'slider',
				tabindex: 0,
				'aria-valuenow': this.root.value,
				'aria-valuemin': this.root.min,
				'aria-valuemax': this.root.max,
				'data-sliderthumb': '',
				onmousedown: this.#handleMousedown,
				onkeydown: this.#handleKeydown,
				style: `position: absolute; ${this.styles}`
			}) as const
	);
	state = $derived.by(() => ({
		value: this.root.value,
		percentage: this.root.Percentage
	}));
}

//
// Builders
//
class SliderValueState {
	root: SliderRootState;

	constructor(root: SliderRootState) {
		this.root = root;
	}

	attrs = $derived.by(
		() =>
			({
				id: this.root.uid('value'),
				min: this.root.min,
				max: this.root.max,
				step: this.root.step,
				value: this.root.value,
				'aria-hidden': 'false',
				'data-slidervalue': '',
				style: 'display: none;'
			}) as const
	);
	state = $derived.by(() => ({
		value: this.root.value,
		percentage: this.root.Percentage
	}));
}

//
// Builders
//
const builder = buildContext(SliderRootState);

export const createRootContext = (props: SliderRootStateProps) => {
	return builder.createContext(props);
};
export const useSliderRange = () => {
	return builder.register(SliderRangeState);
};
export const useSliderThumb = (thumbElement: HTMLDivElement | undefined) => {
	return builder.register(SliderThumbState, thumbElement);
};
export const useSliderValue = () => {
	return builder.register(SliderValueState);
};
