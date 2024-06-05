import { Context, effects } from '$internal';

interface Init {
	value: string[];
	disabled: boolean;
	type: 'text' | 'password';
	placeholder: string;
}

interface Hooks {
	onChange: (value: string) => void;
}

export class PinContext extends Context<Hooks> {
	inputs = $state<string[]>([]);
	value = $state<string[]>([]);
	disabled = $state<boolean>(false);
	type = $state<'text' | 'password'>('text');
	placeholder = $state<string>('');

	transformedValue = $derived(this.value.join());
	filled = $derived(this.value.length === this.inputs.length && this.value.every((el) => el?.length === 1));

	constructor(init: Init, hooks: Hooks) {
		super('pin', hooks);

		this.value = init.value;
		this.disabled = init.disabled;
		this.type = init.type;
		this.placeholder = init.placeholder;
	}

	register(inputId: string) {
		this.inputs.push(inputId);
	}
	setValue(i: number, value: string) {
		this.value[i] = value;
	}

	#effects = effects(() => {
		$effect(() => {
			this.hooks?.onChange(this.transformedValue);
		});
	});
}
