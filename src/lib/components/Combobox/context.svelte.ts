import {
	calculateIndex,
	disableScroll,
	removeDisabledElements,
	FloatingContext,
	effects,
	type CalcIndexAction,
	type JsonValue
} from '$lib/internal/index.js';
import { tick } from 'svelte';

export interface Option {
	value: JsonValue;
	label: string;
	id: string;
	disabled?: boolean;
}

interface Init {
	multiple: boolean;
}

interface Hooks<ValueType> {
	onChange?: (values: { newValue?: ValueType; newTouched?: boolean; newLabel?: string }) => void;
}

export class ComboboxContext<ValueType = any> extends FloatingContext<Hooks<ValueType>, HTMLInputElement> {
	visible = $state<boolean>(true);
	hoveredIndex = $state<number>(-1);
	options = $state<HTMLElement[]>([]);
	selectedOptions = $state<HTMLElement[]>([]);
	mounted = $state<boolean>(false);
	touched = $state<boolean>(false);
	multiple = $state<boolean>(false);

	hoveredOption = $derived<HTMLElement | undefined>(this.options[this.hoveredIndex]);

	constructor(init: Init, hooks: Hooks<ValueType>) {
		super('combobox', hooks);

		this.multiple = init.multiple;
	}

	open() {
		this.visible = true;
	}
	close() {
		this.visible = false;
	}
	toggle() {
		this.visible = !this.visible;
	}
	queryElements() {
		const elements = removeDisabledElements(`#${this.uid('content')} [data-comboboxoption]`);
		if (!elements) return;
		this.options = elements;
	}
	navigate(action: CalcIndexAction) {
		this.hoveredIndex = calculateIndex(action, this.options, this.hoveredIndex);

		if (this.hoveredOption) this.hoveredOption.scrollIntoView({ block: 'nearest' });
	}
	setHovered(optionId?: string) {
		if (!optionId) return;
		this.hoveredIndex = this.options.findIndex((el) => el.id === optionId);
	}
	setSelected() {
		if (!this.hoveredOption) return;

		if (this.multiple) {
			if (this.selectedOptions.find((el) => el.dataset.value === this.hoveredOption?.dataset.value)) {
				this.selectedOptions = this.selectedOptions.filter(
					(el) => el.dataset.value !== this.hoveredOption?.dataset.value
				);
			} else {
				this.selectedOptions.push(this.hoveredOption);
			}
		} else {
			this.selectedOptions[0] = this.hoveredOption;
		}

		if (!this.multiple) this.visible = false;

		const value = this.multiple
			? this.selectedOptions.map((el) => el.dataset.value)
			: this.selectedOptions[0].dataset.value;
		const label = this.multiple ? '' : this.selectedOptions[0].dataset.label || '';
		this.hooks?.onChange?.({ newValue: value as ValueType, newLabel: label });
	}
	setInitialSelected(value: ValueType) {
		this.selectedOptions = this.options.filter((el) => {
			if (!Array.isArray(value) && el.dataset.value === value) return el;
			else if (Array.isArray(value) && value.includes(el.dataset.value)) return el;
		});
	}

	#effects = effects(() => {
		$effect(() => {
			disableScroll(this.visible && !document.body.style.overflow);
		});
		$effect(() => {
			if (!this.visible || !this.options || this.hoveredIndex > this.options.length - 1) this.hoveredIndex = -1;
		});
		$effect(() => {
			if (this.visible) {
				tick().then(() => {
					this.hoveredIndex = this.options.findIndex((option) => option.ariaSelected === 'true');
				});
			} else {
				this.options = [];
				this.touched = false;
			}
		});
		$effect(() => {
			if (this.visible) this.hooks?.onChange?.({ newTouched: this.touched });
		});
	});
}
