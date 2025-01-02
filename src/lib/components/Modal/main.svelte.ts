import { buildContext, createUID, disableScroll, KEYS, type StateValues } from '$internal';

//
// Root
//
type ModalRootProps = StateValues<{
	visible: boolean;
	portalTarget: HTMLElement | string;
}>;
class ModalRoot {
	uid = createUID('modal');

	$visible: ModalRootProps['visible'];
	$portalTarget: ModalRootProps['portalTarget'];

	constructor(props: ModalRootProps) {
		this.$visible = props.visible;
		this.$portalTarget = props.portalTarget;

		$effect(() => {
			disableScroll(this.$visible.val && !document.body.style.overflow);
		});
		$effect(() => {
			window.addEventListener('keydown', this.#handleKeydown);
			return () => {
				window.removeEventListener('keydown', this.#handleKeydown);
			};
		});
	}

	#handleKeydown = (e: KeyboardEvent) => {
		if (e.key === KEYS.escape) this.$visible.val = false;
	};
}

//
// Overlay
//
class ModalOverlay {
	_root: ModalRoot;

	Visible = $derived.by(() => this._root.$visible.val);

	constructor(_root: ModalRoot) {
		this._root = _root;
	}

	attrs = $derived.by(() => ({
		id: this._root.uid('overlay'),
		'aria-hidden': true,
		'data-modaloverlay': ''
	}));
}

//
// Content
//
class ModalContent {
	_root: ModalRoot;

	Visible = $derived.by(() => this._root.$visible.val);

	constructor(_root: ModalRoot) {
		this._root = _root;
	}

	attrs = $derived.by(
		() =>
			({
				id: this._root.uid('content'),
				role: 'dialog',
				'aria-modal': 'true',
				tabindex: -1,
				'aria-describedby': this._root.uid('description'),
				'aria-labeledby': this._root.uid('title'),
				'data-modalcontent': ''
			}) as const
	);
}

//
// Title
//
class ModalTitle {
	_root: ModalRoot;

	constructor(_root: ModalRoot) {
		this._root = _root;
	}

	attrs = $derived.by(() => ({
		id: this._root.uid('title'),
		'data-modaltitle': ''
	}));
}

//
// Description
//
class ModalDescription {
	_root: ModalRoot;

	constructor(_root: ModalRoot) {
		this._root = _root;
	}

	attrs = $derived.by(() => ({
		id: this._root.uid('description'),
		'data-modaldescription': ''
	}));
}

//
// Builder
//
const _rootContext = buildContext(ModalRoot);

export const createRootContext = (props: ModalRootProps) => {
	return _rootContext.createContext(props);
};

export const useModalOverlay = () => {
	return _rootContext.register(ModalOverlay);
};

export const useModalContent = () => {
	return _rootContext.register(ModalContent);
};

export const useModalTitle = () => {
	return _rootContext.register(ModalTitle);
};

export const useModalDescription = () => {
	return _rootContext.register(ModalDescription);
};
