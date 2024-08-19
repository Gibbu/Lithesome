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
	type ContextChange
} from '$internal';

//
// Root
//
interface TabsRootProps {
	value: string;
	orientation: Orientation;
}

class TabsRoot {
	uid = createUID('tabs').uid;
	value = $state<string>('');
	tabs = $state<string[]>([]);
	index = $state<number>(0);
	orientation = $state<Orientation>('horizontal');

	ActiveTab = $derived.by(() => this.tabs[this.index] || this.tabs[0]);

	constructor(props: ContextChange<TabsRootProps>) {
		this.value = props.value;
		this.orientation = props.orientation;

		$effect(() => {
			props.onContextChange({ value: this.value, orientation: this.orientation });
		});
	}
	onComponentChange = (props: TabsRootProps) => {
		this.value = props.value;
		this.orientation = props.orientation;
	};
	setActive = (btnValue: string) => {
		if (!this.tabs.find((el) => el === btnValue))
			log.error('There are no matching vales between the <TabsButton /> and <TabsContent /> components.');

		this.index = this.tabs.findIndex((el) => el === btnValue);
	};
	navigate = (action: CalcIndexAction) => {
		this.index = calculateIndex(action, this.tabs, this.index);
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
				'aria-orientation': this.root.orientation,
				'data-tabslist': '',
				'data-orientation': this.root.orientation
			}) as const
	);
}

//
// Button
//
interface TabsButtonProps {
	value: string;
	disabled: boolean;
}
class TabsButton {
	disabled = $state<boolean>(false);
	value = $state<string>('');
	root: TabsRoot;

	IsActive = $derived.by(() => this.root.ActiveTab === this.value);

	constructor(root: TabsRoot, props: ContextChange<TabsButtonProps>) {
		this.root = root;
		this.value = props.value;
		this.disabled = props.disabled;

		this.root.tabs.push(props.value);

		$effect(() => {
			props.onContextChange({ value: this.value, disabled: this.disabled });
		});
	}
	onComponentChange = (props: TabsButtonProps) => {
		this.disabled = props.disabled;
	};

	#handleClick = () => {
		if (this.disabled) return;

		this.root.setActive(this.value);
	};
	#handleKeydown = (e: KeyboardEvent) => {
		if (this.disabled) return;

		const { key } = e;

		if (PREVENT_KEYS.includes(key)) e.preventDefault();

		if (key === KEYS.home) this.root.navigate('first');
		if (key === KEYS.end) this.root.navigate('last');
		if (
			(key === KEYS.arrowUp && this.root.orientation === 'vertical') ||
			(key === KEYS.arrowLeft && this.root.orientation === 'horizontal')
		)
			this.root.navigate('prev');
		if (
			(key === KEYS.arrowDown && this.root.orientation === 'vertical') ||
			(key === KEYS.arrowRight && this.root.orientation === 'horizontal')
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
				'data-value': this.value,
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
interface TabsContentProps {
	value: string;
}
class TabsContent {
	value = $state<string>('');
	root: TabsRoot;

	IsActive = $derived.by(() => this.root.ActiveTab === this.value);

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

export const createRootContext = (props: ContextChange<TabsRootProps>) => {
	return rootContext.createContext(props);
};
export const useTabsList = () => {
	return rootContext.register(TabsList);
};
export const useTabsButton = (props: ContextChange<TabsButtonProps>) => {
	return rootContext.register(TabsButton, props);
};
export const useTabsContent = (props: TabsContentProps) => {
	return rootContext.register(TabsContent, props);
};
