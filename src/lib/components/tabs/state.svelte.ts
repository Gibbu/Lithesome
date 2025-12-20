import { SvelteMap } from 'svelte/reactivity';
import {
	addEvents,
	attach,
	buildContext,
	calculateIndex,
	createAttributes,
	KEYS,
	log,
	PREVENT_KEYS
} from '$lib/internals/index.js';

import type { CalcIndexAction, GetInternalProps } from '$lib/internals/index.js';
import type { TabsButtonProps, TabsContentProps, TabsListProps, TabsProps } from '$lib/types/index.js';

const { attrs } = createAttributes('tabs', ['root', 'list', 'button', 'content']);

//
// ~~ROOT
//
type RootProps = GetInternalProps<TabsProps>;
class TabsRoot {
	$value: RootProps['value'];
	$orientation: RootProps['orientation'];

	id: string;

	tabs = $state<string[]>([]);
	index = $state<number>(0);
	tabButtonToPanel = new Map<string, string>();
	sharedIds = new SvelteMap();

	ActiveTab = $derived.by(() => this.tabs[this.index] || this.tabs[0]);

	constructor(props: RootProps) {
		this.$value = props.value;
		this.$orientation = props.orientation;
		this.id = props.id;
	}

	setActiveTab = (btnValue: string) => {
		if (!this.tabs.find((el) => el === btnValue)) {
			log.error(`No matching value of "${btnValue}" between <TabsButton /> and <TabsContent> components.`);
			return;
		}

		this.index = this.tabs.findIndex((el) => el === btnValue);
		this.$value.val = this.tabs[this.index];
	};

	navigate = (action: CalcIndexAction) => {
		this.index = calculateIndex(action, this.tabs, this.index);

		(document.querySelector(`${attrs.button}[data-value="${this.ActiveTab}"]`) as HTMLButtonElement | null)?.focus();
	};

	props = $derived.by(() => ({
		id: this.id,
		[attrs.root]: '',
		'data-orientation': this.$orientation.val,
		'data-active': this.ActiveTab
	}));

	state = $derived.by(() => ({
		tab: this.ActiveTab
	}));
}

//
// ~~LIST
//
type ListProps = GetInternalProps<TabsListProps>;
class TabsList {
	id: string;

	_root: TabsRoot;

	constructor(root: TabsRoot, props: ListProps) {
		this._root = root;
		this.id = props.id;
	}

	props = $derived.by(() => ({
		id: this.id,
		[attrs.list]: '',
		role: 'tablist',
		'aria-orientation': this._root.$orientation.val,
		'data-orientation': this._root.$orientation.val
	}));

	state = $derived.by(() => ({
		tab: this._root.ActiveTab
	}));
}

//
// ~~BUTTON
//
type ButtonProps = GetInternalProps<TabsButtonProps>;
class TabsButton {
	$value: ButtonProps['value'];
	$disabled: ButtonProps['disabled'];

	id: string;

	_root: TabsRoot;

	IsActive = $derived.by(() => this._root.ActiveTab === this.$value.val);

	constructor(root: TabsRoot, props: ButtonProps) {
		this._root = root;
		this.$value = props.value;
		this.$disabled = props.disabled;
		this.id = props.id;
		this._root.tabButtonToPanel.set('button-' + this.$value.val, this.id);
	}

	props = $derived.by(() => ({
		id: this.id,
		[attrs.button]: '',
		type: 'button',
		tabindex: this.IsActive ? 0 : -1,
		'data-active': this.IsActive ? '' : undefined,
		'data-value': this.$value.val,
		'aria-controls': this._root.tabButtonToPanel.get('panel-' + this.$value.val),
		...attach((node) =>
			addEvents(node, {
				click: () => {
					if (this.$disabled.val) return;

					this._root.setActiveTab(this.$value.val);
				},
				keydown: (e) => {
					if (this.$disabled.val) return;

					const { key } = e;

					if (PREVENT_KEYS.includes(key)) e.preventDefault();

					if (key === KEYS.home) this._root.navigate('first');
					if (key === KEYS.end) this._root.navigate('last');
					if (
						(key === KEYS.arrowUp && this._root.$orientation.val === 'vertical') ||
						(key === KEYS.arrowLeft && this._root.$orientation.val === 'horizontal')
					)
						this._root.navigate('prev');
					if (
						(key === KEYS.arrowDown && this._root.$orientation.val === 'vertical') ||
						(key === KEYS.arrowRight && this._root.$orientation.val === 'horizontal')
					)
						this._root.navigate('next');
				}
			})
		)
	}));

	state = $derived.by(() => ({
		active: this.IsActive
	}));
}

//
// ~~CONTENT
//
type ContentProps = GetInternalProps<TabsContentProps>;
class TabsContent {
	$value: ContentProps['value'];

	id: string;

	_root: TabsRoot;

	IsActive = $derived.by(() => this._root.ActiveTab === this.$value.val);

	constructor(_root: TabsRoot, props: ContentProps) {
		this._root = _root;
		this.$value = props.value;
		this.id = props.id;

		this._root.tabs.push(props.value.val);
		this._root.tabButtonToPanel.set('panel-' + this.$value.val, this.id);
	}

	props = $derived.by(() => ({
		id: this.id,
		[attrs.content]: '',
		role: 'tabpanel',
		'aria-hidden': !this.IsActive,
		'data-state': this.IsActive ? 'active' : 'inactive',
		'data-value': this.$value.val,
		'data-orientation': this._root.$orientation.val
	}));

	state = $derived.by(() => ({
		active: this.IsActive
	}));

	styles = $derived.by(() => ({
		display: !this.IsActive ? 'none' : undefined
	}));
}

//
// ~~BUILDERS
//
const _rootContext = buildContext(TabsRoot);

export const createTabsRootContext = (props: RootProps) => {
	return _rootContext.create(props);
};
export const useTabsList = (props: ListProps) => {
	return _rootContext.register(TabsList, props);
};
export const useTabsButton = (props: ButtonProps) => {
	return _rootContext.register(TabsButton, props);
};
export const useTabsContent = (props: ContentProps) => {
	return _rootContext.register(TabsContent, props);
};
