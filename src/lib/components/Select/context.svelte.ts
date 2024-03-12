import {
	calculateIndex,
	disableScroll,
	type CalcIndexAction,
	type UID,
	type JsonValue,
	pruneValue
} from '$lib/internal/index.js';
import { tick } from 'svelte';

export interface Option {
	value: JsonValue;
	label: string;
	id: string;
	disabled?: boolean;
}

interface Hooks {
	onChange?: (value: JsonValue) => void;
}

export const createContext = (uid: UID, multiple: boolean = false, hooks?: Hooks) => {
	let visible = $state<boolean>(true);
	let hoveredIndex = $state<number>(-1);
	let options = $state<Option[]>([]);
	let trigger = $state<HTMLElement | null>(null);
	let selectedOptions = $state<Option[]>([]);
	let mounted = $state<boolean>(false);

	const hoveredOption = $derived(options[hoveredIndex]);

	$effect(() => {
		disableScroll(visible && !document.body.style.overflow);
	});
	$effect(() => {
		if (!visible) hoveredIndex = -1;
	});
	$effect(() => {
		if (visible)
			tick().then(() => {
				functions.setInitialHovered();
			});
	});

	const getValue = (): JsonValue => (multiple ? selectedOptions.map((el) => el.value) : selectedOptions[0].value);

	const functions = {
		open() {
			visible = true;
		},
		close() {
			visible = false;
		},
		toggle() {
			visible = !visible;
		},
		register(option: Option) {
			options = [...options, option];
		},
		unregister(option: Option) {
			options = options.filter((el) => el.value === option.value);
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
				if (selectedOptions.find((el) => el.value === hoveredOption?.value)) {
					selectedOptions = selectedOptions.filter((el) => el.value !== hoveredOption?.value);
				} else {
					selectedOptions = [...selectedOptions, hoveredOption];
				}
			} else {
				selectedOptions[0] = hoveredOption;
			}

			if (!multiple) {
				functions.close();
			}

			hooks?.onChange?.(getValue());
		},
		setInitialSelected(value: JsonValue) {
			const val = pruneValue(value);

			selectedOptions = options.filter((el) => {
				if (!Array.isArray(value) && el.value === val) return el;
				else if (Array.isArray(val) && val.includes(el.value)) return el;
			});
		},
		setInitialHovered() {
			hoveredIndex = options.findIndex((option) => selectedOptions.find((selected) => selected.value === option.value));
		},
		setTrigger(node: HTMLElement) {
			trigger = node;
		},
		setMounted(value: boolean) {
			mounted = value;
		}
	};

	return {
		uid,
		...functions,
		get visible() {
			return visible;
		},
		get mounted() {
			return mounted;
		},
		get hoveredIndex() {
			return hoveredIndex;
		},
		get options() {
			return options;
		},
		get selectedOptions() {
			return selectedOptions;
		},
		get hoveredOption() {
			return hoveredOption;
		},
		get trigger() {
			return trigger;
		}
	};
};
