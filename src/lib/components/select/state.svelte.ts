import { onMount, tick } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';
import { outside } from '$lib/attachments/outside.js';
import { portal } from '$lib/attachments/portal.js';
import {
	addEvents,
	attach,
	buildContext,
	calculateIndex,
	createAttributes,
	floating,
	Floating,
	KEYS,
	removeDisabledElements,
	visuallyHidden
} from '$lib/internals/index.js';

import type { CalcIndexAction, GetInternalProps, JsonValue } from '$lib/internals/index.js';
import type {
	SelectArrowProps,
	SelectArrowState,
	SelectContentProps,
	SelectContentState,
	SelectOptionProps,
	SelectOptionState,
	SelectProps,
	SelectState,
	SelectTriggerProps,
	SelectTriggerState,
	SelectValueProps,
	SelectValueState
} from '$lib/types/index.js';

const { attrs, selectors } = createAttributes('select', [
	'root',
	'trigger',
	'content',
	'arrow',
	'option',
	'value',
	'search'
]);

//
// ~ROOT
//
type RootProps = GetInternalProps<SelectProps>;
class SelectRoot extends Floating {
	$$: RootProps;

	hoveredIndex = $state<number>(-1);
	options = $state<HTMLElement[]>([]);
	sharedIds = new SvelteMap<'content' | 'trigger', string>();
	mounted = $state<boolean>(false);
	searchable = $state<boolean>(false);
	serachTerm = $state<string>('');

	HoveredOption = $derived.by<HTMLElement | undefined>(() => this.options[this.hoveredIndex] || undefined);
	SelectedOptions = $derived(
		this.options.filter((opt) => {
			if (!opt.dataset.value) return false;
			return Array.isArray(this.$$.value.val)
				? this.$$.value.val.includes(opt.dataset.value)
				: this.$$.value.val === opt.dataset.value;
		})
	);

	constructor(props: RootProps) {
		super();

		this.$$ = props;

		onMount(async () => {
			await tick();
			this.mounted = true;
			this.$$.visible.val = false;
		});
	}

	/**
	 * Toggle the visible state of the content
	 */
	toggle = () => {
		if (this.$$.visible.val) this.close();
		else this.open();
	};
	/**
	 * Set the visible state of the content to true
	 */
	open = () => {
		this.$$.visible.val = true;
	};
	/**
	 * Set the visible state of the content to false\
	 * and reset variables to reduce duplicate entries.
	 */
	close = () => {
		this.$$.visible.val = false;
		this.hoveredIndex = -1;
	};

	/**
	 * Get all non-disabled options from the content.
	 */
	getAvilableOptions = async () => {
		const contentElement = document.querySelector(`#${this.sharedIds.get('content')}`);
		if (contentElement) this.options = removeDisabledElements(contentElement.querySelectorAll(selectors.option));
	};
	/**
	 * Get any element by its value inside the contents element.
	 * @param value The value to search for.
	 */
	getElementByValue = (value: JsonValue) => {
		return document.querySelector(
			`#${this.sharedIds.get('content')} ${selectors.option}[data-value="${value}"]`
		) as HTMLElement | null;
	};
	/**
	 * Append the option to the parent array, used for keeping track of options.
	 * @param value The value of the option. This must be unique.
	 * @param label The label of the option. If no label is found, the text content of the node is used.
	 */
	registerOption = (option: HTMLElement) => {
		const find = this.options.find((option) => option.dataset.value === option.dataset.value);
		if (!find) this.options.push(option);
	};
	/**
	 * Move the focus to another element based on the action used.
	 * @param action The direction in which to travel.
	 */
	navigate = (action: CalcIndexAction) => {
		this.hoveredIndex = calculateIndex(action, this.options, this.hoveredIndex);

		if (this.HoveredOption) this.HoveredOption.scrollIntoView({ block: 'nearest' });
	};
	/**
	 * Sets the hovered option.
	 * @param value The unique value of the option.
	 */
	setHovered = (value: string) => {
		this.hoveredIndex = this.options.findIndex((el) => el.dataset.value === value);
	};
	/**
	 * Sets the selected option.
	 *
	 * Handles if singular or mulitple values.
	 */
	setSelected = () => {
		if (!this.HoveredOption || !this.HoveredOption.dataset.value) return;
		const newVal = this.HoveredOption.dataset.value;

		if (Array.isArray(this.$$.value.val)) {
			if (this.$$.value.val.includes(newVal)) this.$$.value.val = this.$$.value.val.filter((el) => el !== newVal);
			else this.$$.value.val.push(newVal);
		} else {
			if (this.$$.unselectable.val && this.$$.value.val === newVal) this.$$.value.val = '';
			else this.$$.value.val = newVal;

			this.close();
		}
	};

	state = $derived.by<SelectState>(() => ({
		visible: this.$$.visible.val
	}));
}

//
// ~TRIGGER
//
type TriggerProps = GetInternalProps<SelectTriggerProps>;
class SelectTrigger {
	$$: TriggerProps;

	_root: SelectRoot;

	constructor(root: SelectRoot, props: TriggerProps) {
		this._root = root;
		this.$$ = props;
	}

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.trigger]: '',
		role: 'button',
		'aria-haspopup': 'listbox',
		'aria-expanded': this._root.$$.visible.val,
		'aria-autocomplete': 'list',
		'aria-controls': this._root.$$.visible.val ? this._root.sharedIds.get('content') : undefined,
		...attach((node) => {
			this._root.trigger = node;

			// Such a hacky way, but it works :\
			if (this._root.HoveredOption || this._root.SelectedOptions[0]) {
				tick().then(() => {
					if (this._root.$$.visible.val) {
						const { id } = this._root.HoveredOption || this._root.SelectedOptions[0];
						if (id) node.setAttribute('aria-activedescendant', id);
					}
				});
			}
			if (!this._root.$$.visible.val) node.removeAttribute('aria-activedescendant');

			return addEvents(node, {
				click: () => {
					if (this._root.$$.disabled.val) return;

					this._root.toggle();
				},
				keydown: (e) => {
					const key = e.key;

					if (key === KEYS.arrowUp || key === KEYS.arrowDown || key === KEYS.end || key === KEYS.home)
						e.preventDefault();
					if (key === KEYS.home) this._root.navigate('first');
					if (key === KEYS.end) this._root.navigate('last');
					if (key === KEYS.arrowUp) this._root.navigate('prev');
					if (key === KEYS.arrowDown) this._root.navigate('next');
					if (key === KEYS.escape) this._root.close();
					if (key === KEYS.enter) {
						e.preventDefault();
						if (this._root.HoveredOption && this._root.$$.visible.val) {
							this._root.HoveredOption?.click();
							if (!Array.isArray(this._root.$$.value.val)) this._root.close();
						} else {
							this._root.open();
						}
					}
					if (key === KEYS.tab) this._root.close();
				}
			});
		})
	}));

	state = $derived.by<SelectTriggerState>(() => ({
		visible: this._root.$$.visible.val
	}));
}

//
// ~CONTENT
//
type ContentProps = GetInternalProps<SelectContentProps>;
class SelectContent {
	$$: ContentProps;

	_root: SelectRoot;

	constructor(root: SelectRoot, props: ContentProps) {
		this._root = root;
		this.$$ = props;

		this._root.sharedIds.set('content', this.$$.id.val);

		// Get element references but wait for label to be populated.
		$effect(() => {
			if (this._root.$$.visible.val) {
				tick().then(() => {
					this._root.getAvilableOptions();
				});
			}
		});

		// Set first selected value as highlighted option
		$effect(() => {
			if (this._root.$$.visible.val && this._root.SelectedOptions.length && !this._root.HoveredOption) {
				this._root.hoveredIndex = this._root.options.findIndex((el) => el.dataset.selected === 'true');
			}
		});
	}

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.content]: '',
		...attach((node) => {
			this._root.content = node;

			const outsideCleanUp = outside(this._root.close, { exclude: [this._root.trigger, selectors.content] })(node);
			const floatingCleanUp = floating(this._root.trigger, this._root.arrow, this._root.$$.floatingConfig.val)(node);
			const portalCleanUp = portal(this._root.$$.portalTarget.val)(node);

			return () => {
				outsideCleanUp?.();
				floatingCleanUp?.();
				portalCleanUp?.();
			};
		})
	}));

	state = $derived.by<SelectContentState>(() => ({
		visible: this._root.$$.visible.val
	}));

	styles = $derived.by(() => {
		if (!this._root.mounted) return visuallyHidden;
	});
}

//
// ~ARROW
//
type ArrowProps = GetInternalProps<SelectArrowProps>;
class SelectArrow {
	$$: ArrowProps;

	_root: SelectRoot;

	constructor(root: SelectRoot, props: ArrowProps) {
		this._root = root;
		this.$$ = props;
	}

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.arrow]: '',
		...attach((node) => {
			this._root.arrow = node;
		})
	}));

	state = $derived.by<SelectArrowState>(() => ({
		visible: this._root.$$.visible.val
	}));
}

//
// ~OPTION
//
type OptionProps = GetInternalProps<SelectOptionProps>;
class SelectOption {
	$$: OptionProps;

	_root: SelectRoot;

	Hovered = $derived.by(() => this._root.HoveredOption?.dataset.value === this.$$.value.val);
	Selected = $derived.by(() => !!this._root.SelectedOptions.find((el) => el.dataset.value === this.$$.value.val));

	constructor(root: SelectRoot, props: OptionProps) {
		this._root = root;

		this.$$ = props;
	}

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.option]: '',
		type: 'button',
		disabled: this.$$.disabled.val,
		role: 'option',
		tabindex: 0,
		'aria-selected': this.Selected,
		'data-value': this.$$.value.val,
		'data-label': this.$$.ref.val && !this.$$.label.val ? this.$$.ref.val.textContent.trim() : this.$$.label.val,
		...attach((node) => {
			// Set the hovered index to the active item, if that item is "selected".
			if (this._root.$$.value.val === this.$$.value.val) {
				this._root.hoveredIndex = this._root.options.findIndex((el) => el.dataset.value === this.$$.value.val);
			}

			return addEvents(node, {
				click: () => {
					if (this.$$.disabled.val) return;

					this._root.setSelected();
				},
				mouseover: () => {
					if (this.$$.disabled.val) return;

					this._root.setHovered(this.$$.value.val);
				}
			});
		})
	}));

	state = $derived.by<SelectOptionState>(() => ({
		hovered: this.Hovered,
		selected: this.Selected
	}));
}

//
// ~VALUE
//
type ValueProps = GetInternalProps<SelectValueProps>;
class SelectValue {
	$$: ValueProps;

	_root: SelectRoot;

	PlaceholderVisible = $derived.by(() => !this._root.$$.value.val.length);

	constructor(root: SelectRoot, props: ValueProps) {
		this._root = root;

		this.$$ = props;
	}

	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.value]: '',
		'data-placeholder': this.PlaceholderVisible || undefined
	}));

	state = $derived.by<SelectValueState>(() => ({
		visible: this._root.$$.visible.val,
		placeholderVisible: this.PlaceholderVisible,
		selectedLabels: this._root.SelectedOptions.map((el) => el.dataset.label!)
	}));
}

//
// ~BUILDERS
//
const rootCtx = buildContext(SelectRoot);

export const createSelectRootContext = (props: RootProps) => {
	return rootCtx.create(props);
};

export const useSelectTrigger = (props: TriggerProps) => {
	return rootCtx.register(SelectTrigger, props);
};

export const useSelectContent = (props: ContentProps) => {
	return rootCtx.register(SelectContent, props);
};

export const useSelectArrow = (props: ArrowProps) => {
	return rootCtx.register(SelectArrow, props);
};

export const useSelectOption = (props: OptionProps) => {
	return rootCtx.register(SelectOption, props);
};

export const useSelectValue = (props: ValueProps) => {
	return rootCtx.register(SelectValue, props);
};
