import {
	addEventListeners,
	buildContext,
	createUID,
	Floating,
	KEYS,
	log,
	removeNodeProps,
	setNodeProps,
	trackTimeout,
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

	timeout = trackTimeout();
	hovered = $state<boolean>(false);

	constructor(props: HovercardRootProps) {
		super('Hovercard');

		this.$visible = props.visible;
		this.$delays = props.delays;
	}

	open = () => {
		this.timeout.set(() => {
			this.$visible.val = true;
		}, this.$delays.val.in);
	};
	close = () => {
		this.timeout.set(() => {
			if (!this.hovered) this.$visible.val = false;
		}, this.$delays.val.out);
	};
	forceClose = () => {
		this.$visible.val = false;
		this.timeout.clear();
	};

	state = $derived.by<HovercardState>(() => ({
		visible: this.$visible.val
	}));
}

//
// Trigger
//
class HovercardTrigger {
	_root: HovercardRoot;

	constructor(root: HovercardRoot) {
		this._root = root;

		$effect(() => {
			if (this._root.trigger) {
				const child = this._root.trigger.children[0] as HTMLElement;

				setNodeProps(child, {
					id: this._root.uid('trigger'),
					role: 'button',
					'aria-haspopup': 'dialog',
					'aria-expanded': 'false'
				});
				addEventListeners(child, {
					mouseenter: () => this._root.open(),
					mouseleave: () => this._root.close()
				});
				document.addEventListener('keydown', this.#handleKeydown);

				$effect(() => {
					if (!child) return;

					if (this._root.$visible.val) {
						setNodeProps(child, {
							'aria-expanded': 'true',
							'aria-controls': this._root.uid('content')
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
		if (e.key === KEYS.escape || e.key === KEYS.tab) this._root.forceClose();
	};

	attrs = {
		'data-hovercardtrigger': ''
	};
	state = $derived.by<HovercardState>(() => ({
		visible: this._root.$visible.val
	}));
}

//
// Arrow
//
class HovercardArrow {
	_root: HovercardRoot;

	constructor(root: HovercardRoot) {
		this._root = root;
	}

	attrs = $derived.by(() => ({
		id: this._root.uid('arrow')
	}));
}

//
// Content
//
class HovercardContent {
	_root: HovercardRoot;

	constructor(root: HovercardRoot) {
		this._root = root;
	}

	#handleMouseenter = () => {
		this._root.hovered = true;
		this._root.timeout.clear();
	};
	#handleMouseleave = () => {
		this._root.hovered = false;
		this._root.close();
	};

	attrs = $derived.by(() => ({
		onmouseenter: this.#handleMouseenter,
		onmouseleave: this.#handleMouseleave
	}));
	state = $derived.by<HovercardState>(() => ({
		visible: this._root.$visible.val
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
