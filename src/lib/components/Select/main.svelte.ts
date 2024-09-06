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

//
// Root
//
type SelectRootProps = StateValues<{
	multiple: boolean;
	value: JsonValue;
}>;
class SelectRoot extends Floating {
	uid = createUID('select').uid;

	multiple: SelectRootProps['multiple'];
	value: SelectRootProps['value'];

	visible = $state<boolean>(true);
	hoveredIndex = $state<number>(-1);
	options = $state<HTMLElement[]>([]);
	selectedOptions = $state<HTMLElement[]>([]);
	mounted = $state<boolean>(false);

	HoveredOption = $derived<HTMLElement | undefined>(this.options[this.hoveredIndex] || undefined);

	constructor(props: SelectRootProps) {
		super();

		this.value = props.value;
		this.multiple = props.multiple;

		onMount(async () => {
			await tick();
			this.setInitialSelected(this.value.val);
			this.visible = false;
			this.mounted = true;
		});

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
			}
		});
	}

	open = () => {
		this.visible = true;
	};
	close = () => {
		this.visible = false;
	};
	toggle = () => {
		this.visible = !this.visible;
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

		if (this.multiple.val) {
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

		if (!this.multiple.val) this.visible = false;

		this.value.val = this.multiple.val
			? this.selectedOptions.map((el) => el.dataset.value)
			: this.selectedOptions[0].dataset.value;
	};
	setInitialSelected = (value: JsonValue) => {
		this.selectedOptions = this.options.filter((el) => {
			if (!Array.isArray(value) && el.dataset.value === value) return el;
			else if (Array.isArray(value) && value.includes(el.dataset.value)) return el;
		});
	};

	attrs = $derived.by(
		() =>
			({
				id: this.uid(),
				'data-select': '',
				'data-state': this.visible && this.mounted ? 'opened' : 'closed'
			}) as const
	);
	state = $derived.by(() => ({
		visible: this.visible && this.mounted
	}));
}

//
// Trigger
//
class SelectTrigger {
	root: SelectRoot;

	constructor(root: SelectRoot) {
		this.root = root;

		$effect(() => {
			if (this.root.trigger) {
				const child = this.root.trigger.children[0] as HTMLElement;

				setNodeProps(child, {
					id: this.root.uid('trigger'),
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

					if (this.root.visible) {
						setNodeProps(child, {
							'aria-expanded': 'true',
							'aria-controls': this.root.uid('content')
						});
						if (this.root.HoveredOption) setNodeProps(child, { 'aria-activedescendant': this.root.HoveredOption.id });
					} else {
						setNodeProps(child, { 'aria-expanded': 'false' });
						removeNodeProps(child, 'aria-activedescendant', 'aria-controls');
					}
				});
			}
		});
	}

	registerTrigger = (trigger: HTMLElement) => {
		if (trigger.children.length > 1) log.error('<SelectTrigger /> can only have 1 direct child node.');
		this.root.trigger = trigger;
	};

	#handleKeydown = (e: KeyboardEvent) => {
		const { key } = e;

		if (key === KEYS.arrowUp || key === KEYS.arrowDown || key === KEYS.end || key === KEYS.home) e.preventDefault();
		if (key === KEYS.home) this.root.navigate('first');
		if (key === KEYS.end) this.root.navigate('last');
		if (key === KEYS.arrowUp) this.root.navigate('prev');
		if (key === KEYS.arrowDown) this.root.navigate('next');
		if (key === KEYS.escape) this.root.close();
		if (key === KEYS.enter) {
			e.preventDefault();
			if (this.root.HoveredOption && this.root.visible) {
				(document.querySelector(`#${this.root.HoveredOption.id}`) as HTMLButtonElement).click();
				if (!this.root.multiple) this.root.close();
			} else {
				this.root.open();
			}
		}
		if (key === KEYS.tab) this.root.close();
	};
	#handleClick = () => {
		this.root.toggle();
	};

	attrs = {
		'data-selecttrigger': ''
	};
	state = $derived.by(() => ({
		visible: this.root.visible
	}));
}

//
// Arrow
//
class SelectArrow {
	root: SelectRoot;

	constructor(root: SelectRoot) {
		this.root = root;
	}

	attrs = $derived.by(() => ({
		id: this.root.uid('arrow')
	}));
}

//
// Content
//
class SelectContent {
	root: SelectRoot;

	constructor(root: SelectRoot) {
		this.root = root;
	}

	attrs = $derived.by(() => ({
		hidden: !this.root.mounted || undefined
	}));
	state = $derived.by(() => ({
		visible: this.root.visible
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
	uid = createUID('option').uid;

	root: SelectRoot;

	value: SelectOptionProps['value'];
	disabled: SelectOptionProps['disabled'];
	label: SelectOptionProps['label'];

	Hovered = $derived.by(() => this.root.HoveredOption?.id === this.uid());
	Selected = $derived.by(() => !!this.root.selectedOptions.find((el) => el.dataset.value === this.value.val));

	constructor(root: SelectRoot, props: SelectOptionProps) {
		this.root = root;

		this.value = props.value;
		this.disabled = props.disabled;
		this.label = props.label;

		onMount(() => {
			this.root.queryElements();

			return async () => {
				if (!this.root.visible || this.root.options === this.root.options) return;
				await tick();
				this.root.queryElements();
			};
		});
	}

	#handleMouseover = () => {
		if (this.disabled.val) return;
		this.root.setHovered(this.uid());
	};
	#handleClick = () => {
		if (this.disabled.val) return;
		this.root.setSelected();
	};

	attrs = $derived.by(
		() =>
			({
				id: this.uid(),
				type: 'button',
				disabled: this.disabled.val,
				role: 'option',
				tabindex: 0,
				'aria-selected': this.Selected,
				'data-selected': this.Selected,
				'data-hovered': this.Hovered,
				'data-selectoption': '',
				'data-value': this.value.val,
				'data-label': this.label.val,
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
// Value
//
type SelectValueProps = StateValues<{
	placeholder: string;
}>;
class SelectValue {
	root: SelectRoot;

	placeholder: SelectValueProps['placeholder'];

	PlaceholderVisible = $derived.by(() => this.root.selectedOptions.length === 0);

	constructor(root: SelectRoot, props: SelectValueProps) {
		this.root = root;

		this.placeholder = props.placeholder;
	}

	label = $derived.by(() =>
		this.PlaceholderVisible ? this.placeholder.val : this.root.selectedOptions.map((el) => el.dataset.label).join(',')
	);
	attrs = $derived.by(
		() =>
			({
				id: this.root.uid('value'),
				'data-selectvalue': '',
				'data-placeholder': this.PlaceholderVisible || undefined
			}) as const
	);
	state = $derived.by(() => ({
		placeholderVisible: this.PlaceholderVisible
	}));
}

//
// Builders
//
const rootContext = buildContext(SelectRoot);

export const createRootContext = (props: SelectRootProps) => {
	return rootContext.createContext(props);
};

export const useSelectTrigger = () => {
	return rootContext.register(SelectTrigger);
};

export const useSelectContent = () => {
	return rootContext.register(SelectContent);
};

export const useSelectArrow = () => {
	return rootContext.register(SelectArrow);
};

export const useSelectOption = (props: SelectOptionProps) => {
	return rootContext.register(SelectOption, props);
};

export const useSelectValue = (props: SelectValueProps) => {
	return rootContext.register(SelectValue, props);
};
