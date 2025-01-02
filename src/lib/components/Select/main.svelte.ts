import {
	addEventListeners,
	buildContext,
	calculateIndex,
	createUID,
	disableScroll,
	Floating,
	KEYS,
	log,
	removeDisabledElements,
	removeNodeProps,
	setNodeProps,
	type CalcIndexAction,
	type JsonValue,
	type StateValues
} from '$internal';
import { onMount, tick } from 'svelte';
import type { SelectOptionEvents, SelectOptionState, SelectState, SelectValueState } from './types.js';

//
// Root
//
type SelectRootProps = StateValues<{
	multiple: boolean;
	visible: boolean;
	value: JsonValue;
	controlled: boolean | undefined;
}>;
class SelectRoot extends Floating {
	uid = createUID('select');

	$multiple: SelectRootProps['multiple'];
	$value: SelectRootProps['value'];
	$visible: SelectRootProps['visible'];
	$controlled: SelectRootProps['controlled'];

	hoveredIndex = $state<number>(-1);
	options = $state<HTMLElement[]>([]);
	selectedOptions = $state<HTMLElement[]>([]);
	mounted = $state<boolean>(false);

	HoveredOption = $derived<HTMLElement | undefined>(this.options[this.hoveredIndex] || undefined);
	SuperVisible = $derived.by(() =>
		typeof this.$controlled.val === 'boolean' ? this.$controlled.val && this.$visible.val : this.$visible.val
	);

	constructor(props: SelectRootProps) {
		super('Select');

		this.$value = props.value;
		this.$multiple = props.multiple;
		this.$visible = props.visible;
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
					this.hoveredIndex = this.options.findIndex((option) => option.ariaSelected === 'true');
				});
			} else {
				this.options = [];
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
		const elements = removeDisabledElements(`#${this.uid('content')} [data-selectoption]`);
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
	};
	setInitialSelected = (value: JsonValue) => {
		this.selectedOptions = this.options.filter((el) => {
			if (!Array.isArray(value) && el.dataset.value === value) return el;
			else if (Array.isArray(value) && value.includes(el.dataset.value)) return el;
		});
		this.$visible.val = false;
		this.mounted = true;
	};

	state = $derived.by<SelectState>(() => ({
		visible: this.SuperVisible && this.mounted
	}));
}

//
// Trigger
//
class SelectTrigger {
	_root: SelectRoot;

	constructor(_root: SelectRoot) {
		this._root = _root;

		$effect(() => {
			if (this._root.trigger) {
				const child = this._root.trigger.children[0] as HTMLElement;

				setNodeProps(child, {
					id: this._root.uid('trigger'),
					role: 'button',
					'aria-haspopup': 'listbox',
					'aria-expanded': 'false',
					'aria-autocomplete': 'list'
				});
				addEventListeners(child, {
					click: this.#handleClick,
					keydown: this.#handleKeydown
				});

				$effect(() => {
					if (!child) return;

					if (this._root.$visible.val) {
						setNodeProps(child, {
							'aria-expanded': 'true',
							'aria-controls': this._root.uid('content')
						});
						if (this._root.HoveredOption) setNodeProps(child, { 'aria-activedescendant': this._root.HoveredOption.id });
					} else {
						setNodeProps(child, { 'aria-expanded': 'false' });
						removeNodeProps(child, 'aria-activedescendant', 'aria-controls');
					}
				});
			}
		});
	}

	#handleKeydown = (e: KeyboardEvent) => {
		const { key } = e;

		if (key === KEYS.arrowUp || key === KEYS.arrowDown || key === KEYS.end || key === KEYS.home) e.preventDefault();
		if (key === KEYS.home) this._root.navigate('first');
		if (key === KEYS.end) this._root.navigate('last');
		if (key === KEYS.arrowUp) this._root.navigate('prev');
		if (key === KEYS.arrowDown) this._root.navigate('next');
		if (key === KEYS.escape) this._root.close();
		if (key === KEYS.enter) {
			e.preventDefault();
			if (this._root.HoveredOption && this._root.$visible.val) {
				(document.querySelector(`#${this._root.HoveredOption.id}`) as HTMLButtonElement).click();
				if (!this._root.$multiple) this._root.close();
			} else {
				this._root.open();
			}
		}
		if (key === KEYS.tab) this._root.close();
	};
	#handleClick = () => {
		this._root.toggle();
	};

	attrs = {
		'data-selecttrigger': ''
	};
	state = $derived.by<SelectState>(() => ({
		visible: this._root.$visible.val
	}));
}

//
// Arrow
//
class SelectArrow {
	_root: SelectRoot;

	constructor(_root: SelectRoot) {
		this._root = _root;
	}

	attrs = $derived.by(() => ({
		id: this._root.uid('arrow')
	}));

	state = $derived.by<SelectState>(() => ({
		visible: this._root.$visible.val
	}));
}

//
// Content
//
class SelectContent {
	_root: SelectRoot;

	constructor(_root: SelectRoot) {
		this._root = _root;
	}

	attrs = $derived.by(() => ({
		hidden: !this._root.mounted || undefined
	}));
	state = $derived.by<SelectState>(() => ({
		visible: this._root.$visible.val
	}));
}

//
// Option
//
type SelectOptionProps = StateValues<{
	value: JsonValue;
	disabled: boolean;
	label: string;
}>;
class SelectOption {
	uid = createUID('option');

	_root: SelectRoot;
	#events: SelectOptionEvents;

	$value: SelectOptionProps['value'];
	$disabled: SelectOptionProps['disabled'];
	$label: SelectOptionProps['label'];

	Hovered = $derived.by(() => this._root.HoveredOption?.id === this.uid());
	Selected = $derived.by(() => !!this._root.selectedOptions.find((el) => el.dataset.value === this.$value.val));

	constructor(_root: SelectRoot, props: SelectOptionProps, events: SelectOptionEvents) {
		this._root = _root;
		this.#events = events;

		this.$value = props.value;
		this.$disabled = props.disabled;
		this.$label = props.label;

		onMount(() => {
			this._root.queryElements();

			return async () => {
				if (!this._root.$visible.val || this._root.options === this._root.options) return;
				await tick();
				this._root.queryElements();
			};
		});
	}

	#handleMouseover: SelectOptionEvents['onMouseover'] = (e) => {
		if (this.$disabled.val) return;
		this.#events.onMouseover?.(e);

		this._root.setHovered(this.uid());
	};
	#handleClick: SelectOptionEvents['onClick'] = (e) => {
		if (this.$disabled.val) return;
		this.#events.onClick?.(e);

		this._root.setSelected();
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
				'data-selected': this.Selected,
				'data-hovered': this.Hovered,
				'data-selectoption': '',
				'data-value': this.$value.val,
				'data-label': this.$label.val,
				onmouseover: this.#handleMouseover,
				onclick: this.#handleClick
			}) as const
	);
	state = $derived.by<SelectOptionState>(() => ({
		hovered: this.Hovered,
		selected: this.Selected
	}));
}

//
// Value
//
type SelectValueProps = StateValues<{
	placeholder: string;
}>;
class SelectValue {
	_root: SelectRoot;

	placeholder: SelectValueProps['placeholder'];

	PlaceholderVisible = $derived.by(() => this._root.selectedOptions.length === 0);

	constructor(_root: SelectRoot, props: SelectValueProps) {
		this._root = _root;

		this.placeholder = props.placeholder;
	}

	label = $derived.by(() =>
		this.PlaceholderVisible ? this.placeholder.val : this._root.selectedOptions.map((el) => el.dataset.label).join(',')
	);
	attrs = $derived.by(() => ({
		id: this._root.uid('value'),
		'data-selectvalue': '',
		'data-placeholder': this.PlaceholderVisible || undefined
	}));
	state = $derived.by<SelectValueState>(() => ({
		placeholderVisible: this.PlaceholderVisible
	}));
}

//
// Builders
//
const _rootContext = buildContext(SelectRoot);

export const createRootContext = (props: SelectRootProps) => {
	return _rootContext.createContext(props);
};

export const useSelectTrigger = () => {
	return _rootContext.register(SelectTrigger);
};

export const useSelectContent = () => {
	return _rootContext.register(SelectContent);
};

export const useSelectArrow = () => {
	return _rootContext.register(SelectArrow);
};

export const useSelectOption = (props: SelectOptionProps, events: SelectOptionEvents) => {
	return _rootContext.register(SelectOption, props, events);
};

export const useSelectValue = (props: SelectValueProps) => {
	return _rootContext.register(SelectValue, props);
};
