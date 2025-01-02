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
import type { PopoverState } from './types.js';

//
// Root
//
type PopoverRootProps = StateValues<{
	visible: boolean;
}>;
class PopoverRoot extends Floating {
	uid = createUID('popover');

	$visible: PopoverRootProps['visible'];

	constructor(props: PopoverRootProps) {
		super('Popover');
		this.$visible = props.visible;

		$effect(() => {
			if (this.$visible.val) {
				window.addEventListener('keydown', this.#handleKeydown);
			} else {
				window.removeEventListener('keydown', this.#handleKeydown);
			}
		});
	}

	close = () => {
		this.$visible.val = false;
	};
	toggle = () => {
		this.$visible.val = !this.$visible.val;
	};

	#handleKeydown = (e: KeyboardEvent) => {
		if (e.key === KEYS.escape) this.$visible.val = false;
	};

	state = $derived.by<PopoverState>(() => ({
		visible: this.$visible.val
	}));
}

//
// Trigger
//
class PopoverTrigger {
	_root: PopoverRoot;

	constructor(_root: PopoverRoot) {
		this._root = _root;

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
					click: this.#handleClick,
					keydown: this.#handleKeydown
				});

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
		});
	}

	#handleKeydown = (e: KeyboardEvent) => {
		const { key } = e;
		if (key === KEYS.escape || key === KEYS.tab) this._root.close();
	};
	#handleClick = () => {
		this._root.toggle();
	};

	attrs = {
		'data-popovertrigger': ''
	};
	state = $derived.by<PopoverState>(() => ({
		visible: this._root.$visible.val
	}));
}

//
// Arrow
//
class PopoverArrow {
	_root: PopoverRoot;

	constructor(_root: PopoverRoot) {
		this._root = _root;
	}

	attrs = $derived.by(() => ({
		id: this._root.uid('arrow')
	}));

	state = $derived.by<PopoverState>(() => ({
		visible: this._root.$visible.val
	}));
}

//
// Content
//
class PopoverContent {
	_root: PopoverRoot;

	constructor(_root: PopoverRoot) {
		this._root = _root;
	}

	state = $derived.by<PopoverState>(() => ({
		visible: this._root.$visible.val
	}));
}

//
// Builder
//
const _rootContext = buildContext(PopoverRoot);

export const createRootContext = (props: PopoverRootProps) => {
	return _rootContext.createContext(props);
};
export const usePopoverTrigger = () => {
	return _rootContext.register(PopoverTrigger);
};
export const usePopoverArrow = () => {
	return _rootContext.register(PopoverArrow);
};
export const usePopoverContent = () => {
	return _rootContext.register(PopoverContent);
};
