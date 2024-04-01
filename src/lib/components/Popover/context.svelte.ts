import { Context, effects } from '$lib/internal/index.js';

interface Init {
	visible: boolean;
}
interface Hooks {
	onChange: (val: boolean) => void;
}

export class PopoverContext extends Context<Hooks> {
	visible = $state<boolean>(false);
	trigger = $state<HTMLElement | null>(null);
	content = $state<HTMLElement | null>(null);

	constructor(init: Init, hooks: Hooks) {
		super('popover', hooks);

		this.visible = init.visible;
	}

	close() {
		this.visible = false;
	}
	toggle() {
		this.visible = !this.visible;
	}

	#effects = effects(() => {
		this.hooks?.onChange?.(this.visible);
	});
}
