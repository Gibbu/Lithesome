import {
	buildContext,
	calculateIndex,
	createUID,
	KEYS,
	log,
	PREVENT_KEYS,
	styleObjToString,
	type CalcIndexAction,
	type Orientation,
	type StateValues
} from '$internal';

//
// Root
//
type TabsRootProps = StateValues<{
	value: string;
	orientation: Orientation;
}>;

class TabsRoot {
	uid = createUID('tabs').uid;

	value: TabsRootProps['value'];
	orientation: TabsRootProps['orientation'];

	#tabs = $state<string[]>([]);
	#index = $state<number>(0);

	ActiveTab = $derived.by(() => this.#tabs[this.#index] || this.#tabs[0]);

	constructor(props: TabsRootProps) {
		this.value = props.value;
		this.orientation = props.orientation;
	}

	register(tab: string) {
		this.#tabs.push(tab);
	}
	setActive = (btnValue: string) => {
		if (!this.#tabs.find((el) => el === btnValue))
			log.error('There are no matching vales between the <TabsButton /> and <TabsContent /> components.');

		this.#index = this.#tabs.findIndex((el) => el === btnValue);
	};
	navigate = (action: CalcIndexAction) => {
		this.#index = calculateIndex(action, this.#tabs, this.#index);
		(document.querySelector(`[data-tabsbutton][data-value="${this.ActiveTab}"]`) as HTMLButtonElement)?.focus();
	};

	attrs = $derived.by(
		() =>
			({
				id: this.uid(),
				'data-tabs': '',
				'data-orientation': this.orientation,
				'data-active': this.ActiveTab
			}) as const
	);
	state = $derived.by(() => ({
		tab: this.ActiveTab
	}));
}

//
// List
//
class TabsList {
	root: TabsRoot;

	constructor(root: TabsRoot) {
		this.root = root;
	}

	attrs = $derived.by(
		() =>
			({
				role: 'tablist',
				'aria-orientation': this.root.orientation.val,
				'data-tabslist': '',
				'data-orientation': this.root.orientation.val
			}) as const
	);
}

//
// Button
//
type TabsButtonProps = StateValues<{
	value: string;
	disabled: boolean;
}>;
class TabsButton {
	root: TabsRoot;

	disabled: TabsButtonProps['disabled'];
	value: TabsButtonProps['value'];

	IsActive = $derived.by(() => this.root.ActiveTab === this.value.val);

	constructor(root: TabsRoot, props: TabsButtonProps) {
		this.root = root;
		this.value = props.value;
		this.disabled = props.disabled;

		this.root.register(props.value.val);
	}

	#handleClick = () => {
		if (this.disabled.val) return;

		this.root.setActive(this.value.val);
	};
	#handleKeydown = (e: KeyboardEvent) => {
		if (this.disabled.val) return;

		const { key } = e;

		if (PREVENT_KEYS.includes(key)) e.preventDefault();

		if (key === KEYS.home) this.root.navigate('first');
		if (key === KEYS.end) this.root.navigate('last');
		if (
			(key === KEYS.arrowUp && this.root.orientation.val === 'vertical') ||
			(key === KEYS.arrowLeft && this.root.orientation.val === 'horizontal')
		)
			this.root.navigate('prev');
		if (
			(key === KEYS.arrowDown && this.root.orientation.val === 'vertical') ||
			(key === KEYS.arrowRight && this.root.orientation.val === 'horizontal')
		)
			this.root.navigate('next');
	};

	attrs = $derived.by(
		() =>
			({
				type: 'button',
				role: 'tab',
				tabindex: this.IsActive ? 0 : -1,
				'data-tabsbutton': '',
				'data-state': this.IsActive ? 'active' : 'inactive',
				'data-value': this.value.val,
				onclick: this.#handleClick,
				onkeydown: this.#handleKeydown
			}) as const
	);
	state = $derived.by(() => ({
		active: this.IsActive
	}));
}

//
// Content
//
type TabsContentProps = StateValues<{
	value: string;
}>;
class TabsContent {
	root: TabsRoot;

	value: TabsContentProps['value'];

	IsActive = $derived.by(() => this.root.ActiveTab === this.value.val);

	constructor(root: TabsRoot, props: TabsContentProps) {
		this.root = root;
		this.value = props.value;
	}

	attrs = $derived.by(
		() =>
			({
				role: 'tabpanel',
				'aria-hidden': !this.IsActive,
				'data-tabscontent': '',
				'data-state': this.IsActive ? 'active' : 'inactive',
				'data-value': this.value,
				'data-hidden': !this.IsActive,
				'data-orientation': this.root.orientation,
				style: styleObjToString({
					display: this.IsActive ? undefined : 'none'
				})
			}) as const
	);
	state = $derived.by(() => ({
		active: this.IsActive
	}));
}

//
// Builders
//
const rootContext = buildContext(TabsRoot);

export const createRootContext = (props: TabsRootProps) => {
	return rootContext.createContext(props);
};
export const useTabsList = () => {
	return rootContext.register(TabsList);
};
export const useTabsButton = (props: TabsButtonProps) => {
	return rootContext.register(TabsButton, props);
};
export const useTabsContent = (props: TabsContentProps) => {
	return rootContext.register(TabsContent, props);
};
