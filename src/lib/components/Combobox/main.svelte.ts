import {
	buildContext,
	calculateIndex,
	createUID,
	disableScroll,
	Floating,
	KEYS,
	PREVENT_KEYS,
	removeDisabledElements,
	type CalcIndexAction,
	type JsonValue,
	type StateValues
} from '$internal';
import { onMount, tick } from 'svelte';

import type {
	ComboboxContentState,
	ComboboxInputEvents,
	ComboboxInputState,
	ComboboxOptionEvents,
	ComboboxOptionState,
	ComboboxState
} from './types.js';

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
	controlled: boolean | undefined;
}>;
class ComboboxRoot extends Floating {
	uid = createUID('combobox');

	$visible: ComboboxRootProps['visible'];
	$value: ComboboxRootProps['value'];
	$touched: ComboboxRootProps['touched'];
	$label: ComboboxRootProps['label'];
	$multiple: ComboboxRootProps['multiple'];
	$disabled: ComboboxRootProps['disabled'];
	$controlled: ComboboxRootProps['controlled'];

	options = $state<HTMLElement[]>([]);
	selectedOptions = $state<HTMLElement[]>([]);
	mounted = $state<boolean>(false);
	hoveredIndex = $state<number>(-1);

	HoveredOption = $derived.by<HTMLElement | undefined>(() => this.options[this.hoveredIndex]);
	SuperVisible = $derived.by(() =>
		typeof this.$controlled.val === 'boolean' ? this.$controlled.val && this.$visible.val : this.$visible.val
	);

	constructor(props: ComboboxRootProps) {
		super('Combobox');

		this.$visible = props.visible;
		this.$value = props.value;
		this.$touched = props.touched;
		this.$label = props.label;
		this.$multiple = props.multiple;
		this.$disabled = props.disabled;
		this.$controlled = props.controlled;

		onMount(async () => {
			await tick();
			this.setInitialSelected(this.$value.val);
		});

		$effect(() => {
			disableScroll(this.SuperVisible && !document.body.style.overflow);
		});
		$effect(() => {
			if (!this.SuperVisible || !this.options || this.hoveredIndex > this.options.length - 1) this.hoveredIndex = -1;
		});
		$effect(() => {
			if (this.SuperVisible) {
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
				'data-state': this.SuperVisible && this.mounted ? 'opened' : 'closed'
			}) as const
	);
	state = $derived.by<ComboboxState>(() => ({
		visible: this.SuperVisible && this.mounted
	}));
}

//
// Input
//
class ComboboxInput {
	_root: ComboboxRoot;
	#events: ComboboxInputEvents;

	constructor(root: ComboboxRoot, events: ComboboxInputEvents) {
		this._root = root;
		this.#events = events;
	}

	registerTrigger = (trigger: HTMLInputElement) => {
		this._root.trigger = trigger;
	};

	#handleCick: ComboboxInputEvents['onClick'] = (e) => {
		if (this._root.$disabled.val) return;
		this.#events.onClick?.(e);

		this._root.toggle();
	};
	#handleKeydown: ComboboxInputEvents['onKeydown'] = (e) => {
		if (this._root.$disabled.val) return;
		this.#events.onKeydown?.(e);

		const { key } = e;

		if (!PREVENT_KEYS.includes(key)) {
			this._root.$touched.val = true;
			if (!this._root.SuperVisible) this._root.open();
		}

		if (key === KEYS.arrowUp || key === KEYS.arrowDown || key === KEYS.end || key === KEYS.home) {
			e.preventDefault();
			if (!this._root.SuperVisible) this._root.open();
		}
		if (key === KEYS.home) this._root.navigate('first');
		if (key === KEYS.end) this._root.navigate('last');
		if (key === KEYS.arrowUp) this._root.navigate('prev');
		if (key === KEYS.arrowDown) this._root.navigate('next');
		if (key === KEYS.escape) this._root.close();
		if (key === KEYS.enter) {
			e.preventDefault();
			if (this._root.HoveredOption && this._root.SuperVisible) {
				this._root.HoveredOption.click();
				if (!this._root.$multiple.val) this._root.close();
			} else {
				this._root.open();
			}
		}
		if (key === 'Tab') this._root.close();
	};

	attrs = $derived.by(
		() =>
			({
				id: this._root.uid('input'),
				type: 'text',
				role: 'combobox',
				'aria-autocomplete': 'list',
				'aria-haspopup': 'listbox',
				'aria-controls': this._root.SuperVisible ? this._root.uid('content') : undefined,
				'aria-expanded': this._root.SuperVisible,
				'aria-activedescendant': this._root.HoveredOption?.id || undefined,
				autocomplete: 'off',
				onclick: this.#handleCick,
				onkeydown: this.#handleKeydown
			}) as const
	);
	state = $derived.by<ComboboxInputState>(() => ({
		visible: this._root.SuperVisible
	}));
}

//
// Arrow
//
class ComboboxArrow {
	_root: ComboboxRoot;

	constructor(root: ComboboxRoot) {
		this._root = root;
	}

	attrs = $derived.by(() => ({
		id: this._root.uid('arrow')
	}));
}

//
// Content
//
class ComboboxContent {
	_root: ComboboxRoot;

	constructor(root: ComboboxRoot) {
		this._root = root;
	}

	attrs = $derived.by(() => ({
		hidden: !this._root.mounted || undefined
	}));
	state = $derived.by<ComboboxContentState>(() => ({
		visible: this._root.SuperVisible
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
	uid = createUID('option');

	_root: ComboboxRoot;
	#events: ComboboxOptionEvents;

	$value: ComboboxOptionProps['value'];
	$label: ComboboxOptionProps['label'];
	$disabled: ComboboxOptionProps['disabled'];

	Hovered = $derived.by(() => this._root.HoveredOption?.id === this.uid());
	Selected = $derived.by(() => !!this._root.selectedOptions.find((el) => el.dataset.value === this.$value.val));

	constructor(root: ComboboxRoot, props: ComboboxOptionProps, events: ComboboxOptionEvents) {
		this._root = root;
		this.#events = events;

		this.$value = props.value;
		this.$disabled = props.disabled;
		this.$label = props.label;

		onMount(() => {
			this._root.queryElements();

			return async () => {
				if (!this._root.SuperVisible) return;

				await tick();
				this._root.queryElements();
			};
		});
	}

	#handleClick: ComboboxOptionEvents['onClick'] = (e) => {
		if (this._root.$disabled.val) return;
		this.#events.onClick?.(e);

		this._root.setSelected();
	};
	#handleMouseover: ComboboxOptionEvents['onMouseover'] = (e) => {
		if (this._root.$disabled.val) return;
		this.#events.onMouseover?.(e);

		this._root.setHovered(this.uid());
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
	state = $derived.by<ComboboxOptionState>(() => ({
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

export const useComboboxInput = (events: ComboboxInputEvents) => {
	return rootContext.register(ComboboxInput, events);
};

export const useComboboxContent = () => {
	return rootContext.register(ComboboxContent);
};

export const useComboboxArrow = () => {
	return rootContext.register(ComboboxArrow);
};

export const useComboboxOption = (props: ComboboxOptionProps, events: ComboboxOptionEvents) => {
	return rootContext.register(ComboboxOption, props, events);
};
