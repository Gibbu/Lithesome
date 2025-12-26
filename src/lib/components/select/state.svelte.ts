import { tick } from 'svelte';
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
	visuallyHidden
} from '$lib/internals/index.js';

import type { CalcIndexAction, GetInternalProps, JsonValue } from '$lib/internals/index.js';
import type {
	SelectArrowProps,
	SelectContentProps,
	SelectOptionProps,
	SelectProps,
	SelectTriggerProps,
	SelectValueProps
} from '$lib/types/index.js';

const { attrs, selectors } = createAttributes('select', ['root', 'trigger', 'content', 'arrow', 'option', 'value']);

interface InternalSelectOption {
	value: JsonValue;
	label: string;
}

//
// ~ROOT
//
type RootProps = GetInternalProps<SelectProps>;
class SelectRoot extends Floating {
	$$: RootProps;

	hoveredIndex = $state<number>(-1);
	options = $state<InternalSelectOption[]>([]);
	selectedOptions = $state<InternalSelectOption[]>([]);
	sharedIds = new SvelteMap<'content' | 'trigger', string>();
	mounted = $state<boolean>(false);

	HoveredOption = $derived.by<InternalSelectOption | undefined>(() => this.options[this.hoveredIndex] || undefined);

	constructor(props: RootProps) {
		super();

		this.$$ = props;

		if (this.$$.value.val) this.setInitialSelected();
		else this.doneMounting();
	}

	/**
	 * Toggle the visible state of the content
	 */
	toggle = () => {
		this.$$.visible.val = !this.$$.visible.val;
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
		this.options = [];
		this.hoveredIndex = -1;
	};
	/**
	 * Tells the components that checks have been completed, render as normal.
	 */
	doneMounting = () => {
		this.mounted = true;
		this.$$.visible.val = false;
	};

	/**
	 * Get the element node of the current hovered option.
	 */
	getHoveredElement = () => {
		const hovered = this.options[this.hoveredIndex];
		if (hovered) {
			const option = document.querySelector(
				`#${this.$$.id.val} ${selectors.option}[data-value=${hovered.value}]`
			) as HTMLElement;
			if (option) return option;
		}
		return undefined;
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
	 * Get either the hovered or first selected option id.
	 */
	getHoveredOrFirstSelectedId = async () => {
		await tick();
		const selectedOption = this.HoveredOption || this.selectedOptions[0];
		if (selectedOption) {
			const option = this.getElementByValue(selectedOption.value);
			if (option) return option.id;
		}

		return undefined;
	};
	/**
	 * Append the option to the parent array, used for keeping track of options.
	 * @param value The value of the option. This must be unique.
	 * @param label The label of the option. If no label is found, the text content of the node is used.
	 */
	registerOption = (value: JsonValue, label: string) => {
		const find = this.options.find((option) => option.value === value);
		if (!find) this.options.push({ value, label });
	};
	/**
	 * Move the focus to another element based on the action used.
	 * @param action The direction in which to travel.
	 */
	navigate = (action: CalcIndexAction) => {
		this.hoveredIndex = calculateIndex(action, this.options, this.hoveredIndex);

		const element = this.getHoveredElement();
		if (element) element.scrollIntoView({ block: 'nearest' });
	};
	/**
	 * Sets the hovered option.
	 * @param value The unique value of the option.
	 */
	setHovered = (value: JsonValue) => {
		this.hoveredIndex = this.options.findIndex((el) => el.value === value);
	};
	/**
	 * Sets the selected option.
	 *
	 * Handles if singular or mulitple values.
	 */
	setSelected = () => {
		if (!this.HoveredOption) return;

		if (this.$$.multiple.val) {
			if (this.selectedOptions.find((el) => el.value === this.HoveredOption?.value)) {
				this.selectedOptions = this.selectedOptions.filter((el) => el.value !== this.HoveredOption?.value);
			} else {
				this.selectedOptions.push(this.HoveredOption);
			}
		} else {
			this.selectedOptions[0] = this.HoveredOption;
		}

		if (!this.$$.multiple.val) this.$$.visible.val = false;

		this.$$.value.val = this.$$.multiple.val
			? this.selectedOptions.map((el) => el.value)
			: this.selectedOptions[0].value;
	};
	/**
	 * Sets the trigger label to the selected value, only if it's found in the options array.
	 */
	setInitialSelected = async () => {
		await tick();
		const value = this.$$.value.val;
		this.selectedOptions = this.options.filter((el) => {
			if (!Array.isArray(value) && el.value === value) return el;
			else if (Array.isArray(value) && value.includes(el.value)) return el;
		});
		this.doneMounting();
	};

	state = $derived.by(() => ({
		/**
		 * True if the contents are visible.
		 */
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
			if (this._root.HoveredOption || this._root.selectedOptions[0]) {
				tick().then(async () => {
					if (this._root.$$.visible.val) {
						const id = await this._root.getHoveredOrFirstSelectedId();
						if (id) node.setAttribute('aria-activedescendant', id);
					} else {
						node.removeAttribute('aria-activedescendant');
					}
				});
			}

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
							this._root.getElementByValue(this._root.HoveredOption.value)?.click();
							if (!this._root.$$.multiple.val) this._root.close();
						} else {
							this._root.open();
						}
					}
					if (key === KEYS.tab) this._root.close();
				}
			});
		})
	}));

	state = $derived.by(() => ({
		/**
		 * True if the contents are visible.
		 */
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

	state = $derived.by(() => ({
		/**
		 * True if the contents are visible.
		 */
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

	state = $derived.by(() => ({
		/**
		 * True if the contents are visible.
		 */
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

	Hovered = $derived.by(() => this._root.HoveredOption?.value === this.$$.value.val);
	Selected = $derived.by(() => !!this._root.selectedOptions.find((el) => el.value === this.$$.value.val));

	constructor(root: SelectRoot, props: OptionProps) {
		this._root = root;

		this.$$ = props;

		$effect(() => {
			if (this.$$.disabled.val) return;

			const label = this.$$.label.val || this.$$.ref.val.textContent.trim();
			this._root.registerOption(this.$$.value.val, label);
		});
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
		'data-label': this.$$.label.val,
		...attach((node) =>
			addEvents(node, {
				click: () => {
					if (this.$$.disabled.val) return;

					this._root.setSelected();
				},
				mouseover: () => {
					if (this.$$.disabled.val) return;

					this._root.setHovered(this.$$.value.val);
				}
			})
		)
	}));

	state = $derived.by(() => ({
		/**
		 * True if the option is hovered.
		 */
		hovered: this.Hovered,
		/**
		 * True if the option is selected.
		 */
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

	PlaceholderVisible = $derived.by(() => this._root.selectedOptions.length === 0);

	constructor(root: SelectRoot, props: ValueProps) {
		this._root = root;

		this.$$ = props;
	}

	label = $derived.by(() =>
		this.PlaceholderVisible ? this.$$.placeholder.val : this._root.selectedOptions.map((el) => el.label).join(',')
	);
	props = $derived.by(() => ({
		id: this.$$.id.val,
		[attrs.value]: '',
		'data-placeholder': this.PlaceholderVisible || undefined
	}));

	state = $derived.by(() => ({
		/**
		 * The value of the placeholder
		 */
		placeholderVisible: this.PlaceholderVisible
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
