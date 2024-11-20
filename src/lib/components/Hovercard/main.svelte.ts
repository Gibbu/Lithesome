import {
	addEventListeners,
	buildContext,
	createUID,
	Floating,
	KEYS,
	log,
	removeNodeProps,
	setNodeProps,
	type StateValues
} from '$internal';
import type { HovercardState } from './types.js';

//
// Root
//
type HovercardRootProps = StateValues<{
	visible: boolean;
	delays: { in: number; out: number };
}>;
class HovercardRoot extends Floating {
	uid = createUID('hovercard');

	$visible: HovercardRootProps['visible'];
	$delays: HovercardRootProps['delays'];

	timeout = $state<number | null>(null);
	hovered = $state<boolean>(false);

	constructor(props: HovercardRootProps) {
		super('Hovercard');

		this.$visible = props.visible;
		this.$delays = props.delays;
	}

	open = () => {
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}

		this.timeout = setTimeout(() => {
			this.$visible.val = true;
		}, this.$delays.val.in);
	};
	close = () => {
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}

		this.timeout = setTimeout(() => {
			if (!this.hovered) this.$visible.val = false;
		}, this.$delays.val.out);
	};
	forceClose = () => {
		this.$visible.val = false;
		this.timeout = null;
	};

	state = $derived.by<HovercardState>(() => ({
		visible: this.$visible.val
	}));
}

//
// Trigger
//
class HovercardTrigger {
	root: HovercardRoot;

	constructor(root: HovercardRoot) {
		this.root = root;

		$effect(() => {
			if (this.root.trigger) {
				const child = this.root.trigger.children[0] as HTMLElement;

				setNodeProps(child, {
					id: this.root.uid('trigger'),
					role: 'button',
					'aria-haspopup': 'dialog',
					'aria-expanded': 'false'
				});
				addEventListeners(child, {
					mouseenter: () => this.root.open(),
					mouseleave: () => this.root.close()
				});
				document.addEventListener('keydown', this.#handleKeydown);

				$effect(() => {
					if (!child) return;

					if (this.root.$visible.val) {
						setNodeProps(child, {
							'aria-expanded': 'true',
							'aria-controls': this.root.uid('content')
						});
					} else {
						setNodeProps(child, { 'aria-expanded': 'false' });
						removeNodeProps(child, 'aria-controls');
					}
				});
			}

			return () => {
				document.removeEventListener('keydown', this.#handleKeydown);
			};
		});
	}

	#handleKeydown = (e: KeyboardEvent) => {
		if (e.key === KEYS.escape || e.key === KEYS.tab) this.root.forceClose();
	};

	attrs = {
		'data-hovercardtrigger': ''
	};
	state = $derived.by<HovercardState>(() => ({
		visible: this.root.$visible.val
	}));
}

//
// Arrow
//
class HovercardArrow {
	root: HovercardRoot;

	constructor(root: HovercardRoot) {
		this.root = root;
	}

	attrs = $derived.by(() => ({
		id: this.root.uid('arrow')
	}));
}

//
// Content
//
class HovercardContent {
	root: HovercardRoot;

	constructor(root: HovercardRoot) {
		this.root = root;
	}

	#handleMouseenter = () => {
		this.root.hovered = true;
		this.root.timeout = null;
	};
	#handleMouseleave = () => {
		this.root.hovered = false;
		this.root.close();
	};

	attrs = $derived.by(() => ({
		onmouseenter: this.#handleMouseenter,
		onmouseleave: this.#handleMouseleave
	}));
	state = $derived.by<HovercardState>(() => ({
		visible: this.root.$visible.val
	}));
}

// Builders
const rootContext = buildContext(HovercardRoot);

export const createRootContext = (props: HovercardRootProps) => {
	return rootContext.createContext(props);
};
export const useHovercardTrigger = () => {
	return rootContext.register(HovercardTrigger);
};
export const useHovercardArrow = () => {
	return rootContext.register(HovercardArrow);
};
export const useHovercardContent = () => {
	return rootContext.register(HovercardContent);
};
