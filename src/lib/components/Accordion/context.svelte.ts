import { Context } from '$lib/internal/index.js';

export interface Item {
	id: string;
	disabled: boolean;
}

interface Init {
	single: boolean;
}

export class AccordionContext extends Context {
	items = $state<Item[]>([]);
	activeItems = $state<string[]>([]);
	single = $state<boolean>(false);

	constructor(init: Init) {
		super('accordion');

		this.single = init.single;
	}

	register(item: Item) {
		this.items.push(item);
	}
	toggle(itemId: string) {
		if (this.single) {
			if (this.activeItems[0] === itemId) this.activeItems = [];
			else this.activeItems[0] = itemId;
		} else {
			if (this.activeItems.includes(itemId)) this.activeItems = this.activeItems.filter((el) => el !== itemId);
			else this.activeItems.push(itemId);
		}
	}
	setDisabled(id: string, val: boolean) {
		const i = this.items.findIndex((el) => el.id === id);
		this.items[i].disabled = val;
	}
}
