import {
	calculateIndex,
	disableScroll,
	removeDisabledElements,
	createUID,
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

interface InitialValues {
	multiple?: boolean;
}

interface Hooks<ValueType> {
	onChange?: (values: { newValue?: ValueType; newTouched?: boolean; newLabel?: string }) => void;
}

export const createContext = <ValueType>({ multiple }: InitialValues, hooks?: Hooks<ValueType>) => {
	const { uid } = createUID('combobox');

	let visible = $state<boolean>(true);
	let hoveredIndex = $state<number>(-1);
	let options = $state<HTMLElement[]>([]);
	let trigger = $state<HTMLInputElement | null>(null);
	let dropdown = $state<HTMLElement | null>(null);
	let selectedOptions = $state<HTMLElement[]>([]);
	let mounted = $state<boolean>(false);
	let touched = $state<boolean>(false);

	const hoveredOption = $derived(options[hoveredIndex]);

	$effect(() => {
		disableScroll(visible && !document.body.style.overflow);
	});
	$effect(() => {
		if (!visible || !options || hoveredIndex > options.length - 1) {
			hoveredIndex = -1;
		}
	});
	$effect(() => {
		if (visible) {
			tick().then(() => {
				hoveredIndex = options.findIndex((option) => option.ariaSelected === 'true');
			});
		} else {
			options = [];
			touched = false;
		}
	});

	$effect(() => {
		if (!visible) return;
		hooks?.onChange?.({ newTouched: touched });
	});

	return {
		uid,
		open() {
			visible = true;
		},
		close() {
			visible = false;
		},
		toggle() {
			visible = !visible;
		},
		queryElements() {
			const elements = removeDisabledElements(`#${uid('dropdown')} [data-comboboxoption]`);
			if (!elements) return;
			options = elements;
		},
		navigateOptions(action: CalcIndexAction) {
			hoveredIndex = calculateIndex(action, options, hoveredIndex);

			document.querySelector(`#${hoveredOption?.id}`)?.scrollIntoView({ block: 'nearest' });
		},
		setHoveredOption(optionId?: string) {
			if (!optionId) return;
			hoveredIndex = options.findIndex((el) => el.id === optionId);
		},
		setSelectedOptions() {
			if (!hoveredOption) return;

			if (multiple) {
				if (selectedOptions.find((el) => el.dataset.value === hoveredOption.dataset.value)) {
					selectedOptions = selectedOptions.filter((el) => el.dataset.value !== hoveredOption.dataset.value);
				} else {
					selectedOptions = [...selectedOptions, hoveredOption];
				}
			} else {
				selectedOptions[0] = hoveredOption;
			}

			if (!multiple) {
				visible = false;
			}

			const value = multiple ? selectedOptions.map((el) => el.dataset.value) : selectedOptions[0].dataset.value;
			const label = multiple ? '' : selectedOptions[0].dataset.label || '';
			hooks?.onChange?.({ newValue: value as ValueType, newLabel: label });
		},
		async setInitialSelected(value: ValueType) {
			selectedOptions = options.filter((el) => {
				if (!Array.isArray(value) && el.dataset.value === value) return el;
				else if (Array.isArray(value) && value.includes(el.dataset.value)) return el;
			});
		},
		setTrigger(node: HTMLInputElement) {
			trigger = node;
		},
		setDropdown(node: HTMLElement) {
			dropdown = node;
		},
		setMounted(value: boolean) {
			mounted = value;
		},
		setTouched(value: boolean) {
			touched = value;
		},
		get visible() {
			return visible;
		},
		get hoveredIndex() {
			return hoveredIndex;
		},
		get options() {
			return options;
		},
		get touched() {
			return options;
		},
		get dropdown() {
			return dropdown;
		},
		get mounted() {
			return mounted;
		},
		get selectedOptions() {
			return selectedOptions;
		},
		get hoveredOption() {
			return hoveredOption;
		},
		get trigger() {
			return trigger;
		},
		multiple
	};
};
