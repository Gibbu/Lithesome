import { Context, clamp, effects } from '$internal';

interface Init {
	value: number;
	min: number;
	max: number;
	step: number;
	orientation: 'horizontal' | 'vertical';
	reverse: boolean;
	disabled: boolean;
}
interface Hooks {
	onChange: (value: number) => void;
}

export class SliderContext extends Context<Hooks> {
	min = $state<number>(0);
	max = $state<number>(100);
	step = $state<number>(1);
	value = $state<number>(0);
	orientation = $state<Init['orientation']>('horizontal');
	reverse = $state<boolean>(false);
	disabled = $state<boolean>(false);

	dragging = $state<boolean>(false);

	Percentage = $derived<number>(Math.round(((this.value - this.min) / (this.max - this.min)) * 100));

	trackElement = $state<HTMLDivElement | undefined>(undefined);
	thumbElement = $state<HTMLDivElement | undefined>(undefined);

	constructor(init: Init, hooks: Hooks) {
		super('slider');

		this.hooks = hooks;

		this.min = init.min;
		this.value = init.value;
		this.max = init.max;
		this.step = init.step;
		this.orientation = init.orientation;
		this.reverse = init.reverse;
		this.disabled = init.disabled;
	}

	stepUp() {
		this.value = clamp(this.min, (this.value += this.step), this.max);
	}
	stepDown() {
		this.value = clamp(this.min, (this.value -= this.step), this.max);
	}

	updateProps(props: Init) {
		this.min = props.min;
		this.value = props.value;
		this.max = props.max;
		this.step = props.step;
		this.orientation = props.orientation;
		this.reverse = props.reverse;
		this.disabled = props.disabled;
	}

	#effects = effects(() => {
		$effect(() => {
			this.hooks?.onChange(this.value);
		});
	});
}
