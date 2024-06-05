import { disableScroll, Context, effects } from '$internal';

interface Init {
	visible: boolean;
}

export class ModalContext extends Context {
	visible = $state<boolean>(false);

	constructor(init: Init) {
		super('menu');

		this.visible = init.visible;
	}

	#effects = effects(() => {
		$effect(() => {
			disableScroll(this.visible && !document.body.style.overflow);
		});
	});
}
