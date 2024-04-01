import { Context, effects } from '$lib/internal/index.js';

interface Init {
	visible: boolean;
	delays: { in: number; out: number };
}
interface Hooks {
	onChange: (value: boolean) => void;
}

export class HovercardContext extends Context<Hooks> {
	visible = $state<boolean>(false);
	trigger = $state<HTMLElement | null>(null);
	content = $state<HTMLElement | null>(null);
	timeout = $state<number | null>(null);
	delays = $state<{ in: number; out: number }>({ in: 700, out: 700 });
	hovered = $state<boolean>(false);

	constructor(init: Init, hooks: Hooks) {
		super('hovercard', hooks);

		this.visible = init.visible;
		this.delays = init.delays;
	}

	open() {
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}

		this.timeout = setTimeout(() => {
			this.visible = true;
		}, this.delays.in);
	}
	close() {
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}

		this.timeout = setTimeout(() => {
			if (!this.hovered) this.visible = false;
		}, this.delays.out);
	}

	#effects = effects(() => {
		this.hooks?.onChange?.(this.visible);
	});
}
