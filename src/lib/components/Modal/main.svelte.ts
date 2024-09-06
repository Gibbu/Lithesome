import { buildContext, createUID, disableScroll, KEYS, type StateValues } from '$internal';

//
// Root
//
type ModalRootProps = StateValues<{
	visible: boolean;
	portalTarget: HTMLElement | string;
}>;
class ModalRoot {
	uid = createUID('modal').uid;

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

	attrs = $derived.by(
		() =>
			({
				id: this.uid(),
				'data-modal': ''
			}) as const
	);
}

//
// Overlay
//
class ModalOverlay {
	root: ModalRoot;

	Visible = $derived.by(() => this.root.$visible.val);

	constructor(root: ModalRoot) {
		this.root = root;
	}

	attrs = $derived.by(() => ({
		id: this.root.uid('overlay'),
		'aria-hidden': true,
		'data-modaloverlay': ''
	}));
}

//
// Content
//
class ModalContent {
	root: ModalRoot;

	Visible = $derived.by(() => this.root.$visible.val);

	constructor(root: ModalRoot) {
		this.root = root;
	}

	attrs = $derived.by(
		() =>
			({
				id: this.root.uid('content'),
				role: 'dialog',
				'aria-modal': 'true',
				tabindex: -1,
				'aria-describedby': this.root.uid('description'),
				'aria-labeledby': this.root.uid('title'),
				'data-modalcontent': ''
			}) as const
	);
}

//
// Title
//
class ModalTitle {
	root: ModalRoot;

	constructor(root: ModalRoot) {
		this.root = root;
	}

	attrs = $derived.by(
		() =>
			({
				id: this.root.uid('title'),
				'data-modaltitle': ''
			}) as const
	);
}

//
// Description
//
class ModalDescription {
	root: ModalRoot;

	constructor(root: ModalRoot) {
		this.root = root;
	}

	attrs = $derived.by(
		() =>
			({
				id: this.root.uid('description'),
				'data-modaldescription': ''
			}) as const
	);
}

//
// Builder
//
const rootContext = buildContext(ModalRoot);

export const createRootContext = (props: ModalRootProps) => {
	return rootContext.createContext(props);
};

export const useModalOverlay = () => {
	return rootContext.register(ModalOverlay);
};

export const useModalContent = () => {
	return rootContext.register(ModalContent);
};

export const useModalTitle = () => {
	return rootContext.register(ModalTitle);
};

export const useModalDescription = () => {
	return rootContext.register(ModalDescription);
};
