import { FloatingContext, effects } from '$lib/internal/index.js';

interface Init {
	delays: { in: number; out: number };
}

export class HovercardContext extends FloatingContext {
	visible = $state<boolean>(false);
	timeout = $state<number | null>(null);
	delays = $state<{ in: number; out: number }>({ in: 700, out: 700 });
	hovered = $state<boolean>(false);

	constructor(init: Init) {
		super('hovercard');

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
