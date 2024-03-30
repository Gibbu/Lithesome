import { log, createUID, type CalcIndexAction, calculateIndex } from '$lib/internal/index.js';

type Orientation = 'horizontal' | 'vertical';

interface TabBtn {
	value: string;
	disabled: boolean;
}

interface InitialValues {
	orientation?: Orientation;
	value?: string;
}

export const createContext = (init: InitialValues) => {
	const { uid } = createUID('tabs');

	let tabs = $state<string[]>([]);
	let orientation = $state(init.orientation || 'horizontal');
	let activeIndex = $state<number>(tabs.findIndex((el) => el === init.value));

	const activeTab = $derived<string>(tabs[activeIndex] || tabs[0]);

	return {
		uid,
		setOrientation(val: Orientation) {
			orientation = val;
		},
		register(tab: string) {
			tabs = [...tabs, tab];
		},
		setActive(btnValue: string) {
			if (!tabs.find((el) => el === btnValue))
				log.error('There are no matching vales between the <TabsButton /> and <TabsContent /> components.');
			activeIndex = tabs.findIndex((el) => el === btnValue);
		},
		navigate(action: CalcIndexAction) {
			activeIndex = calculateIndex(action, tabs, activeIndex, true);
			(document.querySelector(`[data-tabsbutton][data-value="${activeTab}"]`) as HTMLButtonElement)?.focus();
		},
		get orientation() {
			return orientation;
		},
		get activeTab() {
			return activeTab;
		},
		get activeIndex() {
			return activeIndex;
		}
	};
};
