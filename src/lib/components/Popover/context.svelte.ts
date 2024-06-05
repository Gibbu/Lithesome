import { FloatingContext, effects } from '$internal';

interface Init {
	visible: boolean;
}
interface Hooks {
	onChange: (val: boolean) => void;
}

export class PopoverContext extends FloatingContext<Hooks> {
	visible = $state<boolean>(false);

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
		$effect(() => {
			if (this._mounted) this.hooks?.onChange?.(this.visible);
		});
	});
}
