import { calculateIndex, disableScroll, FloatingContext, effects, type CalcIndexAction } from '$lib/internal/index.js';

export class MenuContext extends FloatingContext {
	visible = $state<boolean>(false);
	hoveredIndex = $state<number>(-1);
	items = $state<string[]>([]);

	hoveredItem = $derived<string | undefined>(this.items[this.hoveredIndex]);

	constructor() {
		super('menu');
	}

	open() {
		this.visible = true;
	}
	close() {
		this.visible = false;
	}
	toggle() {
		this.visible = !this.visible;
	}
	navigate(action: CalcIndexAction) {
		this.hoveredIndex = calculateIndex(action, this.items, this.hoveredIndex);
	}
	register(itemId: string) {
		this.items.push(itemId);
	}
	unregister(itemId: string) {
		this.items = this.items.filter((el) => el !== itemId);
	}
	setHovered(itemId: string) {
		this.hoveredIndex = this.items.findIndex((el) => el === itemId);
	}

	#effects = effects(() => {
		$effect(() => {
			disableScroll(this.visible && !document.body.style.overflow);
		});
		$effect(() => {
			if (!this.visible) this.hoveredIndex = -1;
		});
	});
}
