import {
	addEventListeners,
	buildContext,
	calculateIndex,
	createUID,
	disableScroll,
	Floating,
	KEYS,
	log,
	PREVENT_KEYS,
	removeDisabledElements,
	removeNodeProps,
	setNodeProps,
	type CalcIndexAction,
	type JsonValue,
	type StateValues
} from '$internal';
import { onMount, tick } from 'svelte';

//
// Root
//
type ComboboxRootProps = StateValues<{
	visible: boolean;
	value: JsonValue;
	touched: boolean;
	label: string;
	multiple: boolean;
	disabled: boolean;
}>;
class ComboboxRoot extends Floating {
	uid = createUID('combobox').uid;

	$visible: ComboboxRootProps['visible'];
	$value: ComboboxRootProps['value'];
	$touched: ComboboxRootProps['touched'];
	$label: ComboboxRootProps['label'];
	$multiple: ComboboxRootProps['multiple'];
	$disabled: ComboboxRootProps['disabled'];

	options = $state<HTMLElement[]>([]);
	selectedOptions = $state<HTMLElement[]>([]);
	mounted = $state<boolean>(false);
	hoveredIndex = $state<number>(-1);

	HoveredOption = $derived.by<HTMLElement | undefined>(() => this.options[this.hoveredIndex]);

	constructor(props: ComboboxRootProps) {
		super();

		this.$visible = props.visible;
		this.$value = props.value;
		this.$touched = props.touched;
		this.$label = props.label;
		this.$multiple = props.multiple;
		this.$disabled = props.disabled;

		onMount(async () => {
			await tick();
			this.setInitialSelected(this.$value.val);
		});

		$effect(() => {
			disableScroll(this.$visible.val && !document.body.style.overflow);
		});
		$effect(() => {
			if (!this.$visible.val || !this.options || this.hoveredIndex > this.options.length - 1) this.hoveredIndex = -1;
		});
		$effect(() => {
			if (this.$visible.val) {
				tick().then(() => {
					const index = this.options.findIndex((option) => option.ariaSelected === 'true');
					this.hoveredIndex = index ?? 0;
				});
			} else {
				this.options = [];
				this.$touched.val = false;
			}
		});
	}

	open = () => {
		this.$visible.val = true;
	};
	close = () => {
		this.$visible.val = false;
	};
	toggle = () => {
		this.$visible.val = !this.$visible.val;
	};
	queryElements = () => {
		const elements = removeDisabledElements(`#${this.uid('content')} [data-comboboxoption]`);
		if (!elements) return;
		this.options = elements;
	};
	navigate = (action: CalcIndexAction) => {
		this.hoveredIndex = calculateIndex(action, this.options, this.hoveredIndex);

		if (this.HoveredOption) this.HoveredOption.scrollIntoView({ block: 'nearest' });
	};
	setHovered = (optionId?: string) => {
		if (!optionId) return;
		this.hoveredIndex = this.options.findIndex((el) => el.id === optionId);
	};
	setSelected = () => {
		if (!this.HoveredOption) return;

		if (this.$multiple.val) {
			if (this.selectedOptions.find((el) => el.dataset.value === this.HoveredOption?.dataset.value)) {
				this.selectedOptions = this.selectedOptions.filter(
					(el) => el.dataset.value !== this.HoveredOption?.dataset.value
				);
			} else {
				this.selectedOptions.push(this.HoveredOption);
			}
		} else {
			this.selectedOptions[0] = this.HoveredOption;
		}

		if (!this.$multiple.val) this.$visible.val = false;

		this.$value.val = this.$multiple.val
			? this.selectedOptions.map((el) => el.dataset.value)
			: this.selectedOptions[0].dataset.value;
		this.$label.val = this.selectedOptions.map((el) => el.dataset.label).join(',');
	};
	setInitialSelected = (value: JsonValue) => {
		this.selectedOptions = this.options.filter((el) => {
			if (!Array.isArray(value) && el.dataset.value === value) return el;
			else if (Array.isArray(value) && value.includes(el.dataset.value)) return el;
		});
		this.$visible.val = false;
		this.mounted = true;
	};

	attrs = $derived.by(
		() =>
			({
				id: this.uid(),
				'data-combobox': '',
				'data-state': this.$visible.val && this.mounted ? 'opened' : 'closed'
			}) as const
	);
	state = $derived.by(() => ({
		visible: this.$visible.val && this.mounted
	}));
}

//
// Input
//
class ComboboxInput {
	root: ComboboxRoot;

	constructor(root: ComboboxRoot) {
		this.root = root;
	}

	registerTrigger = (trigger: HTMLInputElement) => {
		this.root.trigger = trigger;
	};

	#handleCick = () => {
		if (this.root.$disabled.val) return;

		this.root.toggle();
	};
	#handleKeydown = (e: KeyboardEvent) => {
		if (this.root.$disabled.val) return;

		const { key } = e;

		if (!PREVENT_KEYS.includes(key)) {
			this.root.$touched.val = true;
			if (!this.root.$visible.val) this.root.open();
		}

		if (key === KEYS.arrowUp || key === KEYS.arrowDown || key === KEYS.end || key === KEYS.home) {
			e.preventDefault();
			if (!this.root.$visible.val) this.root.open();
		}
		if (key === KEYS.home) this.root.navigate('first');
		if (key === KEYS.end) this.root.navigate('last');
		if (key === KEYS.arrowUp) this.root.navigate('prev');
		if (key === KEYS.arrowDown) this.root.navigate('next');
		if (key === KEYS.escape) this.root.close();
		if (key === KEYS.enter) {
			e.preventDefault();
			if (this.root.HoveredOption && this.root.$visible.val) {
				this.root.HoveredOption.click();
				if (!this.root.$multiple.val) this.root.close();
			} else {
				this.root.open();
			}
		}
		if (key === 'Tab') this.root.close();
	};

	attrs = $derived.by(
		() =>
			({
				id: this.root.uid('input'),
				type: 'text',
				role: 'combobox',
				'aria-autocomplete': 'list',
				'aria-haspopup': 'listbox',
				'aria-controls': this.root.$visible.val ? this.root.uid('content') : undefined,
				'aria-expanded': this.root.$visible.val,
				'aria-activedescendant': this.root.HoveredOption?.id || undefined,
				autocomplete: 'off',
				onclick: this.#handleCick,
				onkeydown: this.#handleKeydown
			}) as const
	);
	state = $derived.by(() => ({
		visible: this.root.$visible.val
	}));
}

//
// Arrow
//
class ComboboxArrow {
	root: ComboboxRoot;

	constructor(root: ComboboxRoot) {
		this.root = root;
	}

	attrs = $derived.by(() => ({
		id: this.root.uid('arrow')
	}));
}

//
// Content
//
class ComboboxContent {
	root: ComboboxRoot;

	constructor(root: ComboboxRoot) {
		this.root = root;
	}

	attrs = $derived.by(() => ({
		hidden: !this.root.mounted || undefined
	}));
	state = $derived.by(() => ({
		visible: this.root.$visible.val
	}));
}

//
// Option
//
type ComboboxOptionProps = StateValues<{
	value: JsonValue;
	label: string;
	disabled: boolean;
}>;
class ComboboxOption {
	uid = createUID('option').uid;

	root: ComboboxRoot;

	$value: ComboboxOptionProps['value'];
	$label: ComboboxOptionProps['label'];
	$disabled: ComboboxOptionProps['disabled'];

	Hovered = $derived.by(() => this.root.HoveredOption?.id === this.uid());
	Selected = $derived.by(() => !!this.root.selectedOptions.find((el) => el.dataset.value === this.$value.val));

	constructor(root: ComboboxRoot, props: ComboboxOptionProps) {
		this.root = root;

		this.$value = props.value;
		this.$disabled = props.disabled;
		this.$label = props.label;

		onMount(() => {
			this.root.queryElements();

			return async () => {
				if (!this.root.$visible.val) return;

				await tick();
				this.root.queryElements();
			};
		});
	}

	#handleClick = () => {
		if (this.root.$disabled.val) return;

		this.root.setSelected();
	};
	#handleMouseover = () => {
		if (this.root.$disabled.val) return;

		this.root.setHovered(this.uid());
	};

	attrs = $derived.by(
		() =>
			({
				id: this.uid(),
				type: 'button',
				disabled: this.$disabled.val,
				role: 'option',
				tabindex: 0,
				'aria-selected': this.Selected,
				'data-hovered': this.Hovered ? '' : undefined,
				'data-selected': this.Selected ? '' : undefined,
				'data-comboboxoption': '',
				'data-value': this.$value.val,
				'data-label': this.$label.val,
				onmouseover: this.#handleMouseover,
				onclick: this.#handleClick
			}) as const
	);
	state = $derived.by(() => ({
		hovered: this.Hovered,
		selected: this.Selected
	}));
}

//
// Builders
//
const rootContext = buildContext(ComboboxRoot);

export const createRootContext = (props: ComboboxRootProps) => {
	return rootContext.createContext(props);
};

export const useComboboxInput = () => {
	return rootContext.register(ComboboxInput);
};

export const useComboboxContent = () => {
	return rootContext.register(ComboboxContent);
};

export const useComboboxArrow = () => {
	return rootContext.register(ComboboxArrow);
};

export const useComboboxOption = (props: ComboboxOptionProps) => {
	return rootContext.register(ComboboxOption, props);
};
