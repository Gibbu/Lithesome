import { log, Context, type CalcIndexAction, calculateIndex } from '$lib/internal/index.js';

type Orientation = 'horizontal' | 'vertical';

interface Init {
	orientation: Orientation;
	value: string;
}

export class TabsContext extends Context {
	tabs = $state<string[]>([]);
	orientation = $state<Orientation>('horizontal');
	activeIndex = $state<number>(0);

	activeTab = $derived<string>(this.tabs[this.activeIndex] || this.tabs[0]);

	constructor(init: Init) {
		super('tabs');

		this.orientation = init.orientation;
		this.activeIndex = this.tabs.findIndex((el) => el === init.value);
	}

	register(tab: string) {
		this.tabs.push(tab);
	}
	setActive(btnValue: string) {
		if (!this.tabs.find((el) => el === btnValue))
			log.error('There are no matching vales between the <TabsButton /> and <TabsContent /> components.');

		this.activeIndex = this.tabs.findIndex((el) => el === btnValue);
	}
	navigate(action: CalcIndexAction) {
		this.activeIndex = calculateIndex(action, this.tabs, this.activeIndex);
		(document.querySelector(`[data-tabsbutton][data-value="${this.activeTab}"]`) as HTMLButtonElement)?.focus();
	}
}
