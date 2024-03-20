import { log, type UID, type CalcIndexAction, calculateIndex } from '$lib/internal/index.js';

type Orientation = 'horizontal' | 'vertical';

interface TabBtn {
	value: string;
	disabled: boolean;
}

interface Config {
	orientation?: Orientation;
	value?: string;
}

export const createContext = (uid: UID, config: Config) => {
	let tabs = $state<string[]>([]);
	let orientation = $state(config.orientation || 'horizontal');
	let activeIndex = $state<number>(tabs.findIndex((el) => el === config.value));

	const activeTab = $derived<string>(tabs[activeIndex] || tabs[0]);

	const functions = {
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
		}
	};

	return {
		uid,
		...functions,
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
